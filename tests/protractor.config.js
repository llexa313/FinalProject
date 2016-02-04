exports.config = {
    framework: "jasmine2",
    chromeOnly: true,
    allScriptsTimeout: 30000,
    includeStackTrace: true,
    getPageTimeout: 30000,
    baseUrl: 'http://localhost:3000/',
    //specs: ['d:/Training/FinalProject/tests/e2e/*.js'],
    jasmineNodeOpts: {defaultTimeoutInterval: 120000},
    onPrepare: function () {
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            filePrefix: 'xmloutput',
            savePath: 'dist/e2e'
        }));
    }
};