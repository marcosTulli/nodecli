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
const util = require('../../lib/util');

chai.use(dirtyChai);

describe('The util module', () => {
  context('The notEmpty function', () => {
    it('Should return true when given a string', () => {
      expect(util.notEmpty('foo')).to.be.true();
    });
    it('Should return error when given an empty string', () => {
      expect(util.notEmpty('')).to.equal('This value is required');
    });
  });
});
