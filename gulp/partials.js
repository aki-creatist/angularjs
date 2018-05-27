'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

module.exports = function(options) {
    gulp.task('partials', function () {
        return gulp.src([
            options.src + '/app/**/*.html',
            options.tmp + '/serve/app/**/*.html'
        ])
            .pipe($.minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            }))
            .pipe($.angularTemplatecache('templateCacheHtml.js', {
                module: 'MyApp',
                root: 'app'
            }))
            .pipe(gulp.dest(options.tmp + '/partials/'));
    });
};
