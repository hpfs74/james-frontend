// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  var configuration = {
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-mocha-reporter'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma'),

      // require('karma-jasmine'),
      // //require('karma-chrome-launcher'),
      // require('karma-phantomjs-launcher'),
      require('karma-junit-reporter'),
      // require('karma-html-reporter'),
      // require('karma-jasmine-html-reporter'),
      // require('karma-coverage'),
      // require('karma-coverage-istanbul-reporter'),
      // require('karma-remap-istanbul'),
      // require('karma-remap-coverage'),
      // require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    /*
     * test results reporter to use
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: ['mocha', 'junit'],

    coverageReporter: {
      includeAllSources: true,
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

    junitReporter: {
      outputDir: './coverage', // results will be saved as $outputDir/$browserName.xml
      outputFile: 'jasmine.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: false, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {} // key value pair of properties to add to the <properties> section of the report
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
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
