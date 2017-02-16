'use strict';

console.log('Starting precommit hook...\n');

const fs = require('fs');
const chalk = require('chalk');
const childProcess = require('child_process');


const isCI = !!process.env['bamboo_repository_revision_number'];

const targetBranch = process.argv[2] || 'HEAD';

const commitMsg = isCI
  ? childProcess.execSync('git log --format=%B -n 1 ' + targetBranch).toString().trim()
  : fs.readFileSync('.git/COMMIT_EDITMSG').toString().trim();
const commitPattern = /^(\w*)(?:\((.+)\))?: (.*)$/gm;
const commit = commitPattern.exec(commitMsg);


//@see https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines
const TYPES = [
  'major', //bumps X.0.0
  'feat', //bumps 0.X.0
  'fix',  //bumps 0.X.0
  'docs',  //bumps 0.0.X
  'style',  //bumps 0.0.X
  'refactor',  //bumps 0.0.X
  'perf',  //bumps 0.0.X
  'test',  //bumps 0.0.X
  'chore'  //bumps 0.0.X
];

const COMMIT_VERSIONS = {
  'major': 'major',
  'feat': 'minor',
  'fix': 'minor',
  'docs': 'patch',
  'style': 'patch',
  'refactor': 'patch',
  'perf': 'patch',
  'test': 'patch',
  'chore': 'patch'
};

if (commit) {
  commit.type = commit[1].trim();
  commit.package = commit[2].trim();
  commit.messageText = commit[3].trim();

  console.log(chalk.cyan('Commit message:'));
  console.log(commitMsg);
  console.log(chalk.cyan('Commit type: '), commit.type);
  console.log(chalk.cyan('Commit package: '), commit.package);
}

if (commit && commit.type && commit.package) {

  if (isCI) {
    fs.writeFileSync('COMMIT_TYPE', commit.type);
    fs.writeFileSync('COMMIT_VERSION', COMMIT_VERSIONS[commit.type]);
    fs.writeFileSync('COMMIT_PACKAGE', commit.package);
  }

  if (!isValidType(commit.type)) {
    throwError(`
    Provided commit type is incorrect.
    Possible types: ${TYPES.join(', ')}
    Got: "${commit.type}"`);
  }

  if (!isValidMessage(commit.messageText)) {
    throwError(`
    Provided commit message subject is incorrect.
    Subject should start from lowercase letter
    and cannot end with a dot.
    See: https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines`);
  }
} else {
  //commit doesn't match require pattern
  throwError(`
    Incorrect commit message.
    Commit message must match pattern: "type(<scope>): commit message"

    <scope> could be anything specifying place of the commit change. For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc...
    got: ${commitMsg}`);
}

function throwError(msg) {
  console.error(chalk.red(msg + '\n'));
  console.log(chalk.red(`
    Commit aborted.`));
  process.exit(1);
}

function isValidType(type) {
  return TYPES.indexOf(type) !== -1;
}

function isValidMessage(message) {
  const subject = message.split('\n')[0];

  if (subject[0] !== subject[0].toLowerCase() || subject.substr(-1) === '.') {
    return false;
  }

  return true;
}

console.log(chalk.green(`
    Commit OK.
    `));

process.exit(0);
