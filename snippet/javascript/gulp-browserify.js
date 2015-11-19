'use strict';

var path = require('path');

var mapStream = require('map-stream');

var gulp = require('gulp');
var source = require('vinyl-source-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var vendors = ['...'];

gulp.task('js', function() {
    var vendorsBundle = browserify();
    vendors.map(function(v) {
        vendorsBundle.require(v);
    });
    vendorsBundle
        .bundle()
        .pipe(source('vendors.js'))
        .pipe(gulp.dest('/path/to/dst'));

    var build = function(input, output) {
        var b = browserify({
            entries: input,
            cache: {},
            packageCache: {},
            debug: true
        })
            .external(vendors)
            .transform(babelify.configure({
                'presets': ['es2015']
            }))
            .plugin(watchify);

        b.on('error', function(err) {
            console.error('Error: ' + err.message);
        });
        var bundle = function() {
            b.bundle()
                .pipe(source(output))
                .pipe(gulp.dest('/path/to/dst'));
        };
        b.on('update', bundle);
        bundle();
    };
    return gulp.src('/path/to/src', {read: false})
        .pipe(mapStream(function(file, cb) {
            var input = path.relative(file.cwd, file.path);
            var output = path.relative(file.base, file.path);
            build(input, output);
        }));
});

