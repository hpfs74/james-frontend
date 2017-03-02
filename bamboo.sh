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
mkdir "$(pwd)/.npm-global"
export NPM_CONFIG_PREFIX="$(pwd)/.npm-global"

npm config set @cx:registry https://swfactory.aegon.com/artifactory/api/npm/npm


