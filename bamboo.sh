#!/bin/bash

set -x
set -e

# Display all the tools versions
echo "Environment: "

git --version
node --version
npm --version

# We need to switch npm global packages location to space we have permission to access
# required for linking dependencies
#mkdir -p "$(pwd)/vendor/node_modules"
#export NPM_CONFIG_PREFIX="$(pwd)/vendor/node_modules/.npm-global"
#export NPM_CONFIG_REGISTRY=https://swfactory.aegon.com/artifactory/api/npm/npm

echo "#### Npm Install"
npm install --scripts-prepend-node-path=false

echo "#### Npm Lint"
npm run lint

echo "#### Vuln check on node modules (nsp)"
npm run security

echo "#### Npm Build"
npm run build

echo "#### Npm Test"
npm test

echo "Build done"

