'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {
    gulp.task('html', ['inject', 'partials'], function () {
        var partialsInjectFile = gulp.src(options.tmp + '/partials/templateCacheHtml.js', { read: false });
        var partialsInjectOptions = {
            starttag: '<!-- inject:partials -->',
            ignorePath: options.tmp + '/partials',
            addRootSlash: false
        };
        var htmlFilter = $.filter('*.html');
        var jsFilter = $.filter('**/*.js');
        var cssFilter = $.filter('**/*.css');
        return gulp.src(options.tmp + '/serve/*.html')
            .pipe($.inject(partialsInjectFile, partialsInjectOptions))

            .pipe($.useref())

            .pipe(jsFilter).pipe($.rev())
            .pipe($.ngAnnotate())
            .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', options.errorHandler('Uglify'))
            .pipe(jsFilter.restore())

            .pipe(cssFilter).pipe($.rev())
            .pipe($.csso())
            .pipe(cssFilter.restore())

            .pipe($.revReplace())
            .pipe(htmlFilter)
            .pipe($.minifyHtml({
                empty: true,
                spare: true,
                quotes: true,
                conditionals: true
            }))
            .pipe(htmlFilter.restore())
            .pipe(gulp.dest(options.dist + '/'))
            .pipe($.size({ title: options.dist + '/', showFiles: true }));
    });
    gulp.task('clean', function (done) {
        $.del([options.dist + '/', options.tmp + '/'], done);
    });
    gulp.task('build', ['html']);
};
