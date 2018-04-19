# Knab Verzekeren Web App (James)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Endpoints and environment variables

Build configuration is managed through `angular-cli`. 

To keep environment specific details out of the code repository we use the environment file to inject environment variables, such as API endpoints and keys into the build. 

More info on the angular-cli environment file can be fount at https://github.com/angular/angular-cli/wiki/build

This is done with the script in `scripts/set-env.ts` which is defined as the `config` npm command in `packages.json`.

A dotenv file is needed to provide the environment variables to the script.


## Build

A production build can be done through the npm command `build:prod` as defined in the `package.json`:

`npm run config -- --environment=prod && ng build --prod --environment=prod --locale`

The `--prod` flag is a meta flag that sets multiple other flags. For more details, see https://github.com/angular/angular-cli/wiki/build

## Locale

The locale flag is used to set the locale for currency and other localized Angular features.

See `src/app/app.module.ts` where the locale provider is configured for Dutch:

```
  {
    provide: LOCALE_ID,
    useValue: 'nl-NL'
  }
```
## Application structure

| Directory |            | Description  |
| -------|-------------| -----|
| `app` |  |  main application root directory|
| | `actions` | @ngrx Actions |
| |`animations`|re-usable animation definitions for Angular components|
| |`components`|generic re-usable Angular components|
| |`directives`|custom Angular directives|
| |`effects`|@ngrx Effects|
| |`forms`|generic re-usable (Reactive) Forms|
| |`models`|models, typescript interface definitions|
| |`pages`|container components that orchestrate app flow|
| |`pipes`|custom Angular pipes|
| |`reducers`|@ngrx Reducers, pure functions that take actions and output new state|
| |`services`|Angular services (Http/Api requests)|
| |`utils`|generic utilities|
|`assets`||various (binary) assets such as images, fonts, etc.|
|`content`||contains json files with content strings| 
|`e2e`||end-to-end tests, currently not used|
|`environments`||environment variables|
|`styles`||Sass/CSS styles|
|`index.html`||application template|
|`main.ts`||Angular application bootstrap|
|`polyfills.ts`||Angular polyfills|
|`styles.scss`||Root Sass file that bundles all other component styles|
|`test.ts`||(Karma) Test bundle initialization|
|`tsconfig.app.json`||TypeScript config|
|`tsconfig.spec.json`||TypeScript config for Karma tests|

Generic components are bundled inside a shared module that re-exports each component. See `src/app/shared.module.ts`
## State management

For state management we partially implemented the Redux pattern using [@ngrx/platform](https://github.com/ngrx/platform)

- `@ngrx/store` - RxJS powered state management for Angular applications, inspired by Redux
- `@ngrx/effects` - Side Effect model for @ngrx/store to model event sources as actions.
- `@ngrx/router-store` - Bindings to connect the Angular Router to @ngrx/store

There is some technical debt left for certain application state that we haven't refactored yet to use the ngrx/store, such as async validators for address and car info lookup and the Reactive Forms are not automatically kept in sync with the store. So these are set individually for each form component.

Follow this discussion on Github on a solution for integrating forms with @ngrx/store: https://github.com/ngrx/core/issues/12


# The new NPM repo is been moved

# Test commit
