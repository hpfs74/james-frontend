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
const targetPath = isProd ? `./src/environments/environment.prod.ts` : `./src/environments/environment.ts`;

let envConfigFile = `
export const environment = {
  production: ${isProd},
  james: {
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
    insurer: '${process.env.JAMES_API_INSURER}'
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

envConfigFile += `\n`;

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Output generated at ${targetPath}`);
});
