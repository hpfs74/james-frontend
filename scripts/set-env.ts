import { writeFile } from 'fs';
import { argv } from 'yargs';

require('dotenv').config();

// get passed argument, for example `ts-node set-env.ts --environment=dev`
const environment = argv.environment;
const logger = console.log;
const enableAnalytics = argv.analytics || false;

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

/* tslint:disable */
function outputGtmSnippet(gtmAuth: string, id: string, gtmVersion: number) {
  // should be first in head tag
  return `
    let gtmScript = document.createElement('script');
    gtmScript.innerHTML =
      \`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl+'&gtm_auth=${gtmAuth}&gtm_preview=env-${gtmVersion}&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${id}');\`

    document.head.insertBefore(gtmScript, document.head.firstChild);
  `;
}

function outputGtmNoScript(gtmAuth: string, id: string, gtmVersion: number) {
  return `
    let gtmNoScript = document.createElement('noscript');
    gtmNoScript.innerHTML =
      \`<iframe src="https://www.googletagmanager.com/ns.html?id=${id}&gtm_auth=${gtmAuth}&gtm_preview=env-${gtmVersion}&gtm_cookies_win=x"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>\`;

      document.body.insertBefore(gtmNoScript, document.body.firstChild);
  `;
}
/* tslint:enable */


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
    enableAnalytics: ${enableAnalytics},
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
        login: '${getEnvVar('PAYLOAD_LOGIN_URL')}',
        activation: '${getEnvVar('PAYLOAD_ACTIVATION_URL')}'
      },
    }
  };
  `;

  // Google Tag Manager
  if (enableAnalytics) {
    const gtmAuth = getEnvVar('GTM_AUTH');
    const gtmId = getEnvVar('GTM_ID');
    const gtmVersion = getEnvVar('GTM_VERSION');

    content += outputGtmSnippet(gtmAuth, gtmId, gtmVersion);
    content += outputGtmNoScript(gtmAuth, gtmId, gtmVersion);
  }

  content = '/* tslint:disable */' + content;
  content += `/* tslint:enable */\n`;

  return content;
}

// Production
createEnvFile('./src/environments/environment.prod.ts', getContent('production'));

// Development
createEnvFile('./src/environments/environment.ts', getContent(environment));

