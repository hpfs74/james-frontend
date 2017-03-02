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
mkdir -p "$(pwd)/vendor/node_modules"
export NPM_CONFIG_PREFIX="$(pwd)/vendor/node_modules/.npm-global"

npm config set prefix "$(pwd)/vendor/node_modules"
npm config set @cx:registry https://swfactory.aegon.com/artifactory/api/npm/npm


