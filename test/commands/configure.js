const inquirer = require('inquirer');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const dirtyChai = require('dirty-chai');
const CredentialManager = require('../../lib/credential-manager');
const path = require('path');
const fs = require('fs');
const configure = require('../../commands/configure');

chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe('The configure module', () => {
  let creds;
  before(() => {
    creds = new CredentialManager('twine-test');
  });
  it('Should add credentials when none are found', async () => {
    sinon.stub(inquirer, 'prompt').resolves({ key: 'one', secret: 'two' });
    await configure.consumer('twine-test');
    const [key, secret] = await creds.getKeyAndSecret();
    expect(key).to.equal('one');
    expect(secret).to.equal('two');
    expect(inquirer.prompt.calledOnce).to.be.true();
    inquirer.prompt.restore();
  });
  it('Should add credentials when none are found', async () => {
    sinon.stub(inquirer, 'prompt').resolves({ key: 'three', secret: 'four' });
    await configure.consumer('twine-test');
    const [key, secret] = await creds.getKeyAndSecret();
    expect(key).to.equal('three');
    expect(secret).to.equal('four');
    expect(inquirer.prompt.calledOnce).to.be.true();
    inquirer.prompt.restore();
  });

  after((done) => {
    fs.unlink(path.join(process.env.HOME, '.config', 'configstore', 'twine-test.json'), done);
  });
});
