// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  james: {
    key: 'https://dftq0qi31m.execute-api.eu-west-1.amazonaws.com/dev/key',
    token: 'https://dftq0qi31m.execute-api.eu-west-1.amazonaws.com/dev/token',
    profile: 'https://dftq0qi31m.execute-api.eu-west-1.amazonaws.com/dev/v1/profile',
    auth: 'https://dftq0qi31m.execute-api.eu-west-1.amazonaws.com/dev/',
    address: 'https://dftq0qi31m.execute-api.eu-west-1.amazonaws.com/dev/v1/address',
    cars: 'https://dftq0qi31m.execute-api.eu-west-1.amazonaws.com/dev/v1/cars',
    carCompare: 'https://dftq0qi31m.execute-api.eu-west-1.amazonaws.com/dev/v1/profile/insurances/compare/car',
    carCoverage: 'https://dftq0qi31m.execute-api.eu-west-1.amazonaws.com/dev/v1/helper/car/coverage',
    carDamageFree: 'https://dftq0qi31m.execute-api.eu-west-1.amazonaws.com/dev/v1/helper/car/damagefree',
    carBuy: 'https://dftq0qi31m.execute-api.eu-west-1.amazonaws.com/dev/v1/car/buystatic'
    // key: process.env.JAMES_API_KEY,
    // token: process.env.JAMES_API_TOKEN,
    // profile: process.env.JAMES_API_PROFILE,
    // auth: process.env.JAMES_API_AUTH,
    // address: process.env.JAMES_API_ADDRESS,
    // cars: process.env.JAMES_API_CARS,
    // carCompare: process.env.JAMES_API_CARCOMPARE,
    // carCoverage: process.env.JAMES_API_CARCOVERAGE,
    // carDamageFree: process.env.JAMES_API_CARDAMAGEFREE,
    // carBuy: process.env.JAMES_API_CARBUY
  }
};
