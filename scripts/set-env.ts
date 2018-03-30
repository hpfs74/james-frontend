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
    technicalIssue: ${getEnvVar('TECHNICAL_ISSUE')},
    domain: '${getEnvVar('JAMES_DOMAIN')}',
    production: ${isProd},
    enableAnalytics: ${enableAnalytics},
    vwoId: ${getEnvVar('VWO_ID')},
    gtmId: '${getEnvVar('GTM_ID')}',
    featureToggles: {
      enableBuyFlowEmail: ${getEnvVar('FEATURE_BUY_FLOW_EMAIL')},
      enableAnalyticsLogging: ${getEnvVar('FEATURE_ANALYTICS_LOGGING')},
      provisionPDFLink: '${getEnvVar('FEATURE_PROVISION_PDF')}',
      knabLab: '${getEnvVar('KNAB_LAB')}'
    },
    external: {
      knab: '${getEnvVar('KNAB_NL')}',
      login: '${getEnvVar('LOGIN')}',
      static: '${getEnvVar('STATIC_PAGE_URL')}',
      iframeUrl: '${getEnvVar('IFRAME_URL')}',
      iframeDesktopParam: '${getEnvVar('IFRAME_DESKTOP_PARAM')}',
      iframeMobileParam: '${getEnvVar('IFRAME_MOBILE_PARAM')}',
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
      loggingEndpoint: '${getEnvVar('LOGGING_ENDPOINT')}',
      tagsEndpoint: '${getEnvVar('TAGS_ENDPOINT')}',
      langEndpoint: '${getEnvVar('LANG_ENDPOINT')}'
    },
    riskInsurance: {
      getHouseData: '${getEnvVar('RISK_INSURANCE_HOUSE_DATA')}',
      HouseHoldAmount: '${getEnvVar('RISK_INSURANCE_HOUSEHOLD_AMOUNT')}',
      HouseHoldPremium: '${getEnvVar('RISK_INSURANCE_HOUSEHOLD_PREMIUM')}'
    }
  };
  `;

  content = '/* tslint:disable */' + content;
  content += `/* tslint:enable */\n`;

  return content;
}

function createEnvironmentFiles() {
  // Production
  createEnvFile(prodEnvFilePath, getContent(environment));

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
