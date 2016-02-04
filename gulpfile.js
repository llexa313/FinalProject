var gulp = require('gulp'),
    jasmine = require('gulp-jasmine'),
    reporters = require('jasmine-reporters'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
});

gulp.task('webdriver_update', function (cb) {
    return require('gulp-protractor').webdriver_update(cb);
});

gulp.task('e2e', ['webdriver_update'], function (cb) {
    var protractor = require('gulp-protractor').protractor;
    gulp.src(['./tests/e2e/*.spec.js'])
        .pipe(protractor({
            configFile: 'tests/protractor.config.js'
        }))
        .on('error', function(e) { throw e })
        .on('end', cb);
});

gulp.task('run-e2e', function (done) {
    var server = require("./server");
    var exec = require('child_process').exec;
    var child = exec('gulp e2e', function (err, stdErr, stdOut) {
        console.log(err);
        console.log(stdErr);
        console.log(stdOut);
        server.close();
        done();
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
});
