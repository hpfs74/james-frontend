# Knab Verzekeren Web

This is the repository for the Knab Verzekeren Angular app (a.k.a. James Web). Before getting started, please work with a (lead) developer to help you get up and running
and familiar with the code and best practices. This document describes how to set up your development environment to build and test the app.

* [Getting Started](#getting-started)
* [AoT Don'ts](#aot)
* [App architecture](#architecture)
* [File structure](#file-structure)
* [Code formatting](#code-guidelines)
* [Definition of done](#scrum-done)
* [Support for debugging in VSCode](#vscode)

## <a name="getting-started"></a> Getting Started

### Dependencies

What you need to run this app:
* `node` and `npm`
* Ensure you're running the latest versions Node `v4.x.x`+ (or `v5.x.x`) and NPM `3.x.x`+

> If you have `nvm` installed, which is highly recommended (`brew install nvm`) you can do a `nvm install --lts && nvm use` in `$` to run with the latest Node LTS. You can also have this `zsh` done for you [automatically](https://github.com/creationix/nvm#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file) 

Once you have those, you should install these globals with `npm install -g`:
* `npm install -g webpack webpack-dev-server karma protractor typescript`

### Using CX-Shared-Library

> NOTE: March 2017 TG: replaced cx-grid with bootstrap 4 grid, recommended not to use it until fully stable

Since we're going to use the cx-shared-library we will need to include
the packages from that project so we need to follow the instructions 
to include the packages from them.

> You can use the .npmrc provided in this repo and skip this step

To access any private npm registry you need to define it.
It can be done by changing your global npm settings with:
npm config set @cx:registry https://swfactory.aegon.com/artifactory/api/npm/npm
or by having .npmrc file in your project defining that registry with the following line:
@cx:registry=https://swfactory.aegon.com/artifactory/api/npm/npm
Now you should be able to run successfully npm install @cx/[package] or npm show @cx/[package]/ Packages names are defined for every packages in their own package.json files.

```
@cx/base
@cx/checkbox
@cx/form
@cx/form-group
@cx/forms
@cx/input
@cx/radio
@cx/select
@cx/slider
@cx/utils
```
After adding the private repository you can install all dependencies from the root directory:
* `npm install`

## <a name="aot"></a> AoT Don'ts

The following are some things that will make AoT compile fail.

- Don’t use require statements for your templates or styles, use styleUrls and templateUrls, the angular2-template-loader plugin will change it to require at build time.
- Don’t use default exports.
- Don’t use `form.controls.controlName`, use `form.get(‘controlName’)`
- Don’t use `control.errors?.someError`, use `control.hasError(‘someError’)`
- Don’t use functions in your providers, routes or declarations, export a function and then reference that function name
- @Inputs, @Outputs, View or Content Child(ren), Hostbindings, and any field you use from the template or annotate for Angular should be public

## <a name="architecture"></a> App architecture

Use a smart-container component that has dumb child, or sub-, components. For example, for the Car insurances there is a `CarModule` that groups
all related car Components, Directives, Services, etc. into one piece of functionality. In the `CarModule`, the `CarComponent` is the smart root container
that passes data into it's child components and receives events back, using `Input()` and `Output()` decorators.

See: http://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/

## <a name="file-structure"></a> File structure

> Needs an update

```
/
 ├──config/                        * our configuration
 |   ├──helpers.js                 * helper functions for our configuration files
 |   ├──spec-bundle.js             * ignore this magic that sets up our angular 2 testing environment
 |   ├──karma.conf.js              * karma config for our unit tests
 |   ├──protractor.conf.js         * protractor config for our end-to-end tests
 │   ├──webpack.dev.js             * our development webpack config
 │   ├──webpack.prod.js            * our production webpack config
 │   └──webpack.test.js            * our testing webpack config
 │
 ├──src/                           * our source files that will be compiled to javascript
 |   ├──main.browser.ts            * our entry file for our browser environment
 │   │
 |   ├──index.html                 * Index.html: where we generate our index page
 │   │
 |   ├──polyfills.ts               * our polyfills file
 │   │
 │   ├──app/                       * WebApp: folder
 │   │   ├──app.component.spec.ts  * a simple test of components in app.component.ts
 │   │   ├──app.e2e.ts             * a simple end-to-end test for /
 │   │   └──app.component.ts       * a simple version of our App component components
 │   │
 │   └──assets/                    * static assets are served here
 │       ├──icons/                  * our list of icons from www.favicon-generator.org
 │       ├──service-worker.js      * ignore this. Web App service worker that's not complete yet
 │       ├──robots.txt             * for search engines to crawl your website
 │       └──humans.txt             * for humans to know who the developers are
 │   │
 │   └──e2e/                    * Cucumber .feature files
 │   │
 │   └──styles/                    * General Sass and CSS files that are bundled automatically
 │
 │
 ├──tslint.json                    * typescript lint config
 ├──typedoc.json                   * typescript documentation generator
 ├──tsconfig.json                  * typescript config used outside webpack
 ├──tsconfig.webpack.json          * config that webpack uses for typescript
 ├──package.json                   * what npm uses to manage it's dependencies
 └──webpack.config.js              * webpack main configuration file
```

## <a name="code-guidelines"></a> Code formatting

Check the linting config files for our formatting conventions:

* Editorconfig: `.editorconfig`
* TypeScript (and Codelyzer): `tslint.json`
* Sass: `config/stylelint.conf.js`


## <a name="scrum-done"></a> Definition of Done

At the end of each development interval, we must have integrated, tested, working, and potentially shippable code, demonstrated
in a production-like environment, created from the master branch, using an automated process, validated with automated  tests.


## <a name="vscode"></a> Support for debugging in VSCode

1. Install the Debugger for Chrome extension from the Extension menu (CTRL+Shift+X in VSCode)
2. Install webpack plugin: `npm install write-file-webpack-plugin --save-dev`
3. Add to tsconfig.webpack.json:
    ```
    "outDir": "dist",
    "sourceRoot": "src",
    ```
4. In tsconfig.json:
	```
    "outDir": "dist",
    "sourceRoot": "src",
    ```
5. In webpack.dev.js
	```
	const WriteFilePlugin = require('write-file-webpack-plugin');

	// ...
	//devtool: 'cheap-module-source-map',
    devtool: 'source-map',

    // sourceMapFilename: '[file].map',

    // After DefinePlugin
    new WriteFilePlugin(),
    ```