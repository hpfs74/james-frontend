import { writeFile } from 'fs';
import { argv } from 'yargs';

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environment = argv.environment;
const isProd = environment === 'prod';
const defaultTarget = './src/environments/environment.ts';
const targetPath = isProd ? `./src/environments/environment.prod.ts` : defaultTarget;
const logger = console.log;

// TODO: provide the correct client id
const forgetPasswordLink =
  `${process.env.NICCI_BASE_URL}` + '/password?client_id=56a6ab20bb00893f071faddc' +
  '&locale=nl_NL' +
  '&response_type=code' +
  '&scope=basic+emailaddress+social' +
  '&redirect_uri=com.mobgen.knab://';

let envConfigFile = `
export const environment = {
  production: ${isProd},
  james: {
    nicciKey: '${process.env.NICCI_KEY}',
    forgetPassword: '${forgetPasswordLink}',
    key: '${process.env.JAMES_API_KEY}',
    token: '${process.env.JAMES_API_TOKEN}',
    profile: '${process.env.JAMES_API_PROFILE}',
    auth: '${process.env.JAMES_API_AUTH}',
    address: '${process.env.JAMES_API_ADDRESS}',
    cars: '${process.env.JAMES_API_CARS}',
    carCompare: '${process.env.JAMES_API_CAR_COMPARE}',
    carCoverage: '${process.env.JAMES_API_CAR_COVERAGE}',
    carDamageFree: '${process.env.JAMES_API_CAR_DAMAGEFREE}',
    carBuy: '${process.env.JAMES_API_CAR_BUY}',
    insurer: '${process.env.JAMES_API_INSURER}',
    payloadEncryption: {
      client: {
        id: '${process.env.PAYLOAD_CLIENT_ID}',
        secret: '${process.env.PAYLOAD_SECRET}',
      },
      key: '${process.env.PAYLOAD_KEY_URL}',
      profile: '${process.env.PAYLOAD_PROFILE_URL}',
      token: '${process.env.PAYLOAD_TOKEN_URL}'
    },
  }
};
`;

if (isProd && process.env.GA_ID) {
  envConfigFile += `document.write(\`
    <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script', 'https://www.google-analytics.com/analytics.js','ga');
    ga('create', '${process.env.GA_ID}', 'auto');
    ga('send', 'pageview');
  </script>\`);`;
}

// Disable linting of environment config
envConfigFile = '/* tslint:disable */' + envConfigFile;
envConfigFile += `/* tslint:enable */\n`;

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    logger(err);
  }
  logger(`Output generated at ${targetPath}`);
});

// Also write production config to environment.ts due to angular-cli bug
if (isProd) {
  writeFile(defaultTarget, envConfigFile, function (err) {
    if (err) {
      logger(err);
    }
    logger(`Output generated at ${defaultTarget}`);
  });
}
