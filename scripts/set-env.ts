import { writeFile } from 'fs';
import { argv } from 'yargs';

require('dotenv').config();

// get passed argument, for example `ts-node set-env.ts --environment=dev`
const environment = argv.environment;
const logger = console.log;

function getEnvVar(name) {
  if (!process.env[name]) {
    throw new Error(`Sorry cannot find any value for "${name}" env var. Please provide one!!!`);
  }
  return process.env[name];
}

function getGoogleAnalytics() {
  return `document.write(\`
    <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script', 'https://www.google-analytics.com/analytics.js','ga');
    ga('create', '${getEnvVar('GA_ID')}', 'auto');
    ga('send', 'pageview');
  </script>\`);`;
}

function createEnvFile(targetPath: string, data: any) {
  writeFile(targetPath, data, function (err) {
    if (err) {
      logger(err);
    }
    logger(`Output generated at ${targetPath}`);
  });
}

function getContent(environment: string) {
  const isProd = environment === 'production' || environment === 'prod';

  // TODO: provide the correct client id
  const forgetPasswordLink =
  `${getEnvVar('NICCI_BASE_URL')}/password?client_id=${getEnvVar('PAYLOAD_CLIENT_ID')}` +
  '&response_type=code' +
  '&scope=basic+emailaddress+social';

  let content = `
  export const environment = {
    production: ${isProd},
    external: {
      registration: '${getEnvVar('WEBSITE_REGISTRATION')}',
      login: '${getEnvVar('LOGIN')}'
    },
    james: {
      forgetPassword: '${forgetPasswordLink}',
      key: '${getEnvVar('JAMES_API_KEY')}',
      token: '${getEnvVar('JAMES_API_TOKEN')}',
      profile: '${getEnvVar('JAMES_API_PROFILE')}',
      auth: '${getEnvVar('JAMES_API_AUTH')}',
      address: '${getEnvVar('JAMES_API_ADDRESS')}',
      cars: '${getEnvVar('JAMES_API_CARS')}',
      carCompare: '${getEnvVar('JAMES_API_CAR_COMPARE')}',
      carCoverage: '${getEnvVar('JAMES_API_CAR_COVERAGE')}',
      carDamageFree: '${getEnvVar('JAMES_API_CAR_DAMAGEFREE')}',
      carBuy: '${getEnvVar('JAMES_API_CAR_BUY')}',
      insurer: '${getEnvVar('JAMES_API_INSURER')}',
      payloadEncryption: {
        client: {
          id: '${getEnvVar('PAYLOAD_CLIENT_ID')}',
          secret: '${getEnvVar('PAYLOAD_CLIENT_SECRET')}',
        },
        key: '${getEnvVar('PAYLOAD_KEY_URL')}',
        profile: '${getEnvVar('PAYLOAD_PROFILE_URL')}',
        token: '${getEnvVar('PAYLOAD_TOKEN_URL')}',
        login: '${getEnvVar('PAYLOAD_LOGIN_URL')}'
      },
    }
  };
  `;

  if (isProd && getEnvVar('GA_ID')) {
    content += getGoogleAnalytics();
  }

  content = '/* tslint:disable */' + content;
  content += `/* tslint:enable */\n`;

  return content;
}

// Production
createEnvFile('./src/environments/environment.prod.ts', getContent('production'));

// Development
createEnvFile('./src/environments/environment.ts', getContent(environment));

