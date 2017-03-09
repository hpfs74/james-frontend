#!/bin/bash

set -x
set -e


# Deployment
export AWS_ACCESS_KEY_ID=AKIAIHJBGUS6V4RNM6PQ
export AWS_SECRET_ACCESS_KEY=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
export AWS_DEFAULT_REGION=us-west-1

aws s3 cp dist/ s3://aws-website-knab-dev-0b8y4/ --recursive --include "*"
