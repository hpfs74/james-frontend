/**
 * @desc
 * This scripts does the invalidation of the cloudfront
 * distrubtion specified in the environment variable:
 *
 *  - CLOUDFRONT_DISTRIBUTIONID
 *
 */

const AWS = require('aws-sdk');
const chalk = require('chalk');

const cloudfront = new AWS.CloudFront();
const params = {
  DistributionId: process.env.CLOUDFRONT_DISTRIBUTIONID,
  InvalidationBatch: {
    CallerReference: 'SiteVersion ' + new Date(),
    Paths: {
      Quantity: 1,
      Items: [
        '/*'
      ]
    }
  }
};

cloudfront.createInvalidation(params, function(err, data) {
  if (err) {
    console.log(chalk.red('ERROR:'), err.message);
    return;
  }

  console.log(chalk.green('SUCCESS'), data.Invalidation.Id);
  console.log(data);
});
