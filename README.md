# Knab Verzekeren Web

## Getting Started

### Dependencies

What you need to run this app:
* `node` and `npm`
* Ensure you're running the latest versions Node `v4.x.x`+ (or `v5.x.x`) and NPM `3.x.x`+

> If you have `nvm` installed, which is highly recommended (`brew install nvm`) you can do a `nvm install --lts && nvm use` in `$` to run with the latest Node LTS. You can also have this `zsh` done for you [automatically](https://github.com/creationix/nvm#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file) 

Once you have those, you should install these globals with `npm install -g`:
* `npm install -g webpack webpack-dev-server karma protractor typescript`

### Using CX-Shared-Library

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

## AoT Don'ts

The following are some things that will make AoT compile fail.

- Don’t use require statements for your templates or styles, use styleUrls and templateUrls, the angular2-template-loader plugin will change it to require at build time.
- Don’t use default exports.
- Don’t use `form.controls.controlName`, use `form.get(‘controlName’)`
- Don’t use `control.errors?.someError`, use `control.hasError(‘someError’)`
- Don’t use functions in your providers, routes or declarations, export a function and then reference that function name
- @Inputs, @Outputs, View or Content Child(ren), Hostbindings, and any field you use from the template or annotate for Angular should be public

## File structure

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

## Code formatting

Check the linting config files for our formatting conventions:

* Editorconfig: `.editorconfig`
* TypeScript: `tslint.json`
* Sass: `config/stylelint.conf.js`


## Support for debugging in VSCode

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