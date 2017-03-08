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

echo "#### Npm Build"
npm run build

echo "#### Npm Test"
npm test

echo "Build done"

# Deployment
export AWS_ACCESS_KEY_ID=AKIAIHJBGUS6V4RNM6PQ
export AWS_SECRET_ACCESS_KEY=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
export AWS_DEFAULT_REGION=us-west-1

aws s3 cp dist/ s3://aws-website-knab-dev-0b8y4/ --recursive --include "*"
