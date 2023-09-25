const crypto = require('crypto');
const Oauth = require('oauth-1.0a');
const axios = require('axios');

class Twitter {
  constructor(consumerKey, consumerSecret) {
    this.baseUrl = 'https://api.twitter.com/';
    this.token = {};
    const oauth = Oauth({
      consumer: {
        key: consumerKey,
        secret: consumerSecret,
      },
      signature_method: 'HMAC-SHA1',
      hash_function(baseString, key) {
        return crypto.createHmac('sha1', key).update(baseString).digest('base64');
      },
    });
    axios.interceptors.request.use((config) => {
      config.headers = oauth.toHeader(
        oauth.authroize(
          { url: `${config.baseUrl}${config.url}`, method: config.method, data: config.data },
          this.token
        )
      );
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    });
    axios.defaults.baseURL = this.baseUrl;
  }
  setToken(key, secret) {
    this.token = { key, secret };
  }
  async get(api) {
    let response = await axios.get(api);
    return response.data;
  }
  async post(api, data) {
    let response = await axios.post(api, data);
    return response.data;
  }
}

module.exports = Twitter;
