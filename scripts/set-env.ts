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

function outputUsabillaSnippet() {
  // Encrypting usabilla script to base64 as it is overcomplicated with regexps, and two types of quotes that makes it impossible to convert to string even with backquotes
  return "let usabillaScript = document.createElement('script');usabillaScript.innerHTML = window.atob('d2luZG93LmxpZ2h0bmluZ2pzfHxmdW5jdGlvbihjKXtmdW5jdGlvbiBnKGIsZCl7ZCYmKGQrPSgvXD8vLnRlc3QoZCk/IiYiOiI/IikrImx2PTEiKTtjW2JdfHxmdW5jdGlvbigpe3ZhciBpPXdpbmRvdyxoPWRvY3VtZW50LGo9YixnPWgubG9jYXRpb24ucHJvdG9jb2wsbD0ibG9hZCIsaz0wOyhmdW5jdGlvbigpe2Z1bmN0aW9uIGIoKXthLlAobCk7YS53PTE7Y1tqXSgiX2xvYWQiKX1jW2pdPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gbSgpe20uaWQ9ZTtyZXR1cm4gY1tqXS5hcHBseShtLGFyZ3VtZW50cyl9dmFyIGIsZT0rK2s7Yj10aGlzJiZ0aGlzIT1pP3RoaXMuaWR8fDA6MDsoYS5zPWEuc3x8W10pLnB1c2goW2UsYixhcmd1bWVudHNdKTttLnRoZW49ZnVuY3Rpb24oYixjLGgpe3ZhciBkPWEuZmhbZV09YS5maFtlXXx8W10saj1hLmVoW2VdPWEuZWhbZV18fFtdLGY9YS5waFtlXT1hLnBoW2VdfHxbXTtiJiZkLnB1c2goYik7YyYmai5wdXNoKGMpO2gmJmYucHVzaChoKTtyZXR1cm4gbX07cmV0dXJuIG19O3ZhciBhPWNbal0uXz17fTthLmZoPXt9O2EuZWg9e307YS5waD17fTthLmw9ZD9kLnJlcGxhY2UoL15cL1wvLywoZz09Imh0dHBzOiI/ZzoiaHR0cDoiKSsiLy8iKTpkO2EucD17MDorbmV3IERhdGV9O2EuUD1mdW5jdGlvbihiKXthLnBbYl09bmV3IERhdGUtYS5wWzBdfTthLncmJmIoKTtpLmFkZEV2ZW50TGlzdGVuZXI/aS5hZGRFdmVudExpc3RlbmVyKGwsYiwhMSk6aS5hdHRhY2hFdmVudCgib24iK2wsYik7dmFyIHE9ZnVuY3Rpb24oKXtmdW5jdGlvbiBiKCl7cmV0dXJuWyI8aGVhZD48L2hlYWQ+PCIsYywnIG9ubG9hZD0idmFyIGQ9JyxuLCI7ZC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLiIsZCwiKGQuIixnLCIoJ3NjcmlwdCcpKS4iLGksIj0nIixhLmwsIidcIj48LyIsYywiPiJdLmpvaW4oIiIpfXZhciBjPSJib2R5IixlPWhbY107aWYoIWUpcmV0dXJuIHNldFRpbWVvdXQocSwxMDApO2EuUCgxKTt2YXIgZD0iYXBwZW5kQ2hpbGQiLGc9ImNyZWF0ZUVsZW1lbnQiLGk9InNyYyIsaz1oW2ddKCJkaXYiKSxsPWtbZF0oaFtnXSgiZGl2IikpLGY9aFtnXSgiaWZyYW1lIiksbj0iZG9jdW1lbnQiLHA7ay5zdHlsZS5kaXNwbGF5PSJub25lIjtlLmluc2VydEJlZm9yZShrLGUuZmlyc3RDaGlsZCkuaWQ9bysiLSIrajtmLmZyYW1lQm9yZGVyPSIwIjtmLmlkPW8rIi1mcmFtZS0iK2o7L01TSUVbIF0rNi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSYmKGZbaV09ImphdmFzY3JpcHQ6ZmFsc2UiKTtmLmFsbG93VHJhbnNwYXJlbmN5PSJ0cnVlIjtsW2RdKGYpO3RyeXtmLmNvbnRlbnRXaW5kb3dbbl0ub3BlbigpfWNhdGNoKHMpe2EuZG9tYWluPWguZG9tYWluLHA9ImphdmFzY3JpcHQ6dmFyIGQ9IituKyIub3BlbigpO2QuZG9tYWluPSciK2guZG9tYWluKyInOyIsZltpXT1wKyJ2b2lkKDApOyJ9dHJ5e3ZhciByPWYuY29udGVudFdpbmRvd1tuXTtyLndyaXRlKGIoKSk7ci5jbG9zZSgpfWNhdGNoKHQpe2ZbaV09cCsnZC53cml0ZSgiJytiKCkucmVwbGFjZSgvIi9nLFN0cmluZy5mcm9tQ2hhckNvZGUoOTIpKyciJykrJyIpO2QuY2xvc2UoKTsnfWEuUCgyKX07YS5sJiZzZXRUaW1lb3V0KHEsMCl9KSgpfSgpO2NbYl0ubHY9IjEiO3JldHVybiBjW2JdfXZhciBvPSJsaWdodG5pbmdqcyIsaz13aW5kb3dbb109ZyhvKTtrLnJlcXVpcmU9ZztrLm1vZHVsZXM9Y30oe30pO3dpbmRvdy51c2FiaWxsYV9saXZlID0gbGlnaHRuaW5nanMucmVxdWlyZSgidXNhYmlsbGFfbGl2ZSIsICIvL3cudXNhYmlsbGEuY29tL2QzMDEyNmJjYmY5OS5qcyIpOw0K');document.body.insertBefore(usabillaScript, document.body.firstChild);";
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
    featureToggles: {
      enableBuyFlowEmail: ${getEnvVar('FEATURE_BUY_FLOW_EMAIL')},
      enableAnalyticsLogging: ${getEnvVar('FEATURE_ANALYTICS_LOGGING')},
      provisionPDFLink: '${getEnvVar('FEATURE_PROVISION_PDF')}'
    },
    external: {
      knab: '${getEnvVar('KNAB_NL')}',
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

  // Google Tag Manager
  if (enableAnalytics) {
    const gtmAuth = ''; // getEnvVar('GTM_AUTH');
    const gtmId = getEnvVar('GTM_ID');
    const gtmVersion = 0; // getEnvVar('GTM_VERSION');

    content += outputGtmSnippet(gtmAuth, gtmId, gtmVersion, environment);
    content += outputGtmNoScript(gtmAuth, gtmId, gtmVersion, environment);
  }

  // Usabilla
  content += outputUsabillaSnippet();

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



