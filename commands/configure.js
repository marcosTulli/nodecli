const inquirer = require('inquirer');
const CredentialManager = require('../lib/credential-manager');
const util = require('../lib/util');

const configure = {
  async consumer(name) {
    const creds = new CredentialManager(name);
    const answers = await inquirer.prompt([
      { type: 'input', name: 'key', message: 'Enter your API key:', validate: util.notEmpty },
      { type: 'password', name: 'secret', message: 'Enter your API secret:', validate: util.notEmpty },
    ]);
    await creds.storeKeyAndSecret(answers.key, answers.secret);
  },
};

module.exports = configure;
