const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const dirtyChai = require('dirty-chai');
const CredentialManager = require('../../lib/credential-manager');
const path = require('path');
const fs = require('fs');

chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('A Credential Manager', () => {
  let creds;
  before(() => {
    creds = new CredentialManager('twine-test');
  });
  it('Should return credentials when they are found', async () => {
    await creds.storeKeyAndSecret('foo', 'bar');
    const [key, secret] = await creds.getKeyAndSecret();
    expect(key).to.equal('foo');
    expect(secret).to.equal('bar');
  });
  it('Shoud reject when no credentials are found', async () => {
    await creds.clearKeyAndSecret();
    expect(creds.getKeyAndSecret()).to.be.rejected();
  });

  after((done) => {
    fs.unlink(path.join(process.env.HOME, '.config', 'configstore', 'twine-test.json'), done);
  });
});
