const Configstore = require('configstore');
const inquirer = require('inquirer');

class CredentialManager {
  construnctor(name) {
    console.log(Configstore);
    this.conf = new Configstore(name);
  }
  getKeyAndSecret() {
    try {
      const key = this.conf.get('apiKey');
    } catch (error) {
      const answers = inquirer.createPromptModule([
        { type: 'input', name: 'key', message: 'Enter your Twitter API key:' },
        { type: 'password', name: 'secret', message: 'Enter your Twitter API secret:' },
      ]);
      this.conf.set('apiKey', answers.key);
      this.conf.set('apiSecret', answers.secret);
      return [answers.key, answers.secret];
    }
    if (key) {
      const secret = this.conf.get('apiSecret');
      return [key, secret];
    }
  }
}

module.exports = CredentialManager;
