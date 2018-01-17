import { writeFile, existsSync } from 'fs';
import { argv } from 'yargs';

require('dotenv').config();

// get passed argument, for example `ts-node set-env.ts --environment=dev`
const environment = argv.environment;
const logger = console.log;
const enableAnalytics = argv.analytics || false;
const isWatchMode = argv['no-regenerate'] || false;
const prodEnvFilePath = './src/environments/environment.prod.ts';
const devEnvFilePath = './src/environments/environment.ts';

function isProduction(environment: string) {
  return environment === 'production' || environment === 'prod';
}

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
function outputGtmSnippet(gtmAuth: string, id: string, gtmVersion: number, environment: string) {
  // TODO: Fay asked to put same script for test and production
  //if (isProduction(environment)) {
  // should be first in head tag
  return `
    let gtmScript = document.createElement('script');
    gtmScript.innerHTML =
      \`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${id}');\`

    document.head.insertBefore(gtmScript, document.head.firstChild);
  `;
  // }
  //
  // // should be first in head tag
  // return `
  //   let gtmScript = document.createElement('script');
  //   gtmScript.innerHTML =
  //     \`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  //     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  //     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  //     'https://www.googletagmanager.com/gtm.js?id='+i+dl+'&gtm_auth=${gtmAuth}&gtm_preview=env-${gtmVersion}&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
  //     })(window,document,'script','dataLayer','${id}');\`
  //
  //   document.head.insertBefore(gtmScript, document.head.firstChild);
  // `;
}

function outputGtmNoScript(gtmAuth: string, id: string, gtmVersion: number, environment: string) {
  // TODO: Fay asked to put same script for test and production
  //if (isProduction(environment)) {
  return `
    let gtmNoScript = document.createElement('noscript');
    gtmNoScript.innerHTML =
      \`<iframe src="https://www.googletagmanager.com/ns.html?id=${id}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>\`;

      document.body.insertBefore(gtmNoScript, document.body.firstChild);
  `;
  // }
  //
  // return `
  //   let gtmNoScript = document.createElement('noscript');
  //   gtmNoScript.innerHTML =
  //     \`<iframe src="https://www.googletagmanager.com/ns.html?id=${id}&gtm_auth=${gtmAuth}&gtm_preview=env-${gtmVersion}&gtm_cookies_win=x"
  //     height="0" width="0" style="display:none;visibility:hidden"></iframe>\`;
  //
  //     document.body.insertBefore(gtmNoScript, document.body.firstChild);
  // `;
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
  const isProd = isProduction(environment);

  // TODO: provide the correct client id
  const forgetPasswordLink =
    `${getEnvVar('NICCI_BASE_URL')}/password?client_id=${getEnvVar('PAYLOAD_CLIENT_ID')}` +
    '&response_type=code' +
    '&scope=basic+emailaddress+social';

  let content = `
  export const environment = {
    production: ${isProd},
    enableAnalytics: ${enableAnalytics},
    featureToggles: {
      enableBuyFlowEmail: ${getEnvVar('FEATURE_BUY_FLOW_EMAIL')},
      enableAnalyticsLogging: ${getEnvVar('FEATURE_ANALYTICS_LOGGING')}
    },
    external: {
      login: '${getEnvVar('LOGIN')}',
      static: '${getEnvVar('STATIC_PAGE_URL')}'
    },
    james: {
      featureToggle: '${getEnvVar('JAMES_API_FEATURE_TOGGLE')}',
      forgetPassword: '${forgetPasswordLink}',
      key: '${getEnvVar('JAMES_API_KEY')}',
      token: '${getEnvVar('JAMES_API_TOKEN')}',
      profile: '${getEnvVar('JAMES_API_PROFILE')}',
      profileInsurances: '${getEnvVar('JAMES_API_PROFILE_INSURANCES')}',
      profileCarInsurances: '${getEnvVar('JAMES_API_PROFILE_CAR_INSURANCES')}',
      auth: '${getEnvVar('JAMES_API_AUTH')}',
      address: '${getEnvVar('JAMES_API_ADDRESS')}',
      suggestion: '${getEnvVar('JAMES_API_SUGGESTION')}',
      cars: '${getEnvVar('JAMES_API_CARS')}',
      advice: '${getEnvVar('JAMES_API_ADVICE')}',
      insuranceAdvice: '${getEnvVar('JAMES_API_INSURANCE_ADVICE')}',
      carCompare: '${getEnvVar('JAMES_API_CAR_COMPARE')}',
      carCoverage: '${getEnvVar('JAMES_API_CAR_COVERAGE')}',
      carDamageFree: '${getEnvVar('JAMES_API_CAR_DAMAGEFREE')}',
      carBuy: '${getEnvVar('JAMES_API_CAR_BUY')}',
      sdBuy: '${getEnvVar('JAMES_API_SD_BUY')}',
      insurer: '${getEnvVar('JAMES_API_INSURER')}',
      meldcode: '${getEnvVar('JAMES_API_MELDCODE')}',
      payloadEncryption: {
        client: {
          id: '${getEnvVar('PAYLOAD_CLIENT_ID')}',
          secret: '${getEnvVar('PAYLOAD_CLIENT_SECRET')}',
        },
        key: '${getEnvVar('PAYLOAD_KEY_URL')}',
        profile: '${getEnvVar('PAYLOAD_PROFILE_URL')}',
        me: '${getEnvVar('NICCI_NEW_PASSWORD')}',
        profileWithAdvice: '${getEnvVar('PAYLOAD_PROFILE_WITH_ADVICE_URL')}',
        token: '${getEnvVar('PAYLOAD_TOKEN_URL')}',
        login: '${getEnvVar('PAYLOAD_LOGIN_URL')}',
        activation: '${getEnvVar('PAYLOAD_ACTIVATION_URL')}'
      },
    },
    riskInsurance: {
      getHouseData: '${getEnvVar('RISK_INSURANCE_HOUSE_DATA')}',
      HouseHoldAmount: '${getEnvVar('RISK_INSURANCE_HOUSEHOLD_AMOUNT')}',
      HouseHoldPremium: '${getEnvVar('RISK_INSURANCE_HOUSEHOLD_PREMIUM')}'
    }
  };
  `;

  // Google Tag Manager
  if (enableAnalytics) {
    const gtmAuth = ''; // getEnvVar('GTM_AUTH');
    const gtmId = getEnvVar('GTM_ID');
    const gtmVersion = 0; // getEnvVar('GTM_VERSION');

    content += outputGtmSnippet(gtmAuth, gtmId, gtmVersion, environment);
    content += outputGtmNoScript(gtmAuth, gtmId, gtmVersion, environment);
  }

  content = '/* tslint:disable */' + content;
  content += `/* tslint:enable */\n`;

  return content;
}

function createEnvironmentFiles() {
  // Production
  createEnvFile(prodEnvFilePath, getContent('production'));

  // Development
  createEnvFile(devEnvFilePath, getContent(environment));
}

// main
if (isWatchMode && !existsSync(prodEnvFilePath) && !existsSync(devEnvFilePath)) {
  createEnvironmentFiles();
}

if (!isWatchMode) {
  createEnvironmentFiles();
}



