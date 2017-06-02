module.exports = function (config) {
  var testWebpackConfig = require('./webpack.test.js')({
    env: 'test'
  });

  var configuration = {

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    /*
     * Frameworks to use
     *
     * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['jasmine'],

    // list of files to exclude
    exclude: [],

    client: {
      captureConsole: false
    },

    /*
     * list of files / patterns to load in the browser
     *
     * we are building the test environment in ./spec-bundle.js
     */
    files: [{
      pattern: './config/spec-bundle.js',
      watched: false
    },
    {
      pattern: './src/assets/**/*',
      watched: false,
      included: false,
      served: true,
      nocache: false
    }
    ],

    /*
     * By default all assets are served at http://localhost:[PORT]/base/
     */
    proxies: {
      "/assets/": "/base/src/assets/"
    },

    /*
     * preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: {
      './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
    },

    // Webpack Config at ./webpack.test.js
    webpack: testWebpackConfig,

    // Webpack please don't spam the console when running in karma!
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i.e.
      noInfo: true,
      // and use stats to turn off verbose output
      stats: {
        // options i.e.
        chunks: false
      }
    },

    /*
     * test results reporter to use
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: ['mocha', 'dots', 'coverage', 'remap-coverage', 'html', 'junit'],

    coverageReporter: {
      type: 'in-memory',
      reporters: [
        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
        { type: 'json', subdir: '.', file: 'coverage-final.json' },
        { type: 'clover', dir: 'coverage', subdir: '.', file: 'clover.xml' }
      ]
    },

    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },

    htmlReporter: {
      outputDir: 'coverage',
      reportName: 'karma-unit'
    },

    junitReporter: {
      outputDir: './coverage', // results will be saved as $outputDir/$browserName.xml
      outputFile: 'jasmine.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: false, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {} // key value pair of properties to add to the <properties> section of the report
    },

    // web server port
    port: 9876,

    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: process.env.KARMA_WATCH ? true : false,
    browsers: ['PhantomJS'],
    singleRun: process.env.KARMA_WATCH ? false : true
  };

  // CI
  if (!process.env.KARMA_WATCH) {
    configuration.coverageReporter.reporters.push({ type: 'text' });
    configuration.coverageReporter.reporters.push({ type: 'text-summary' });
  }

  config.set(configuration);
};
