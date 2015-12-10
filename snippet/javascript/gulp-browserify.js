'use strict';

var path = require('path');

var mapStream = require('map-stream');

var gulp = require('gulp');
var source = require('vinyl-source-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var envify = require('envify');
var unreachable = require('unreachable-branch-transform');
var collapser = require('bundle-collapser/plugin');

var vendors = ['...'];
gulp.task('js', function() {
    var build = function(name, src, dst) {
        src = src
            .transform(babelify.configure({
                'presets': ['es2015']
            }))
            .transform(envify)
            .transform(unreachable)
            .plugin(collapser)
            .plugin(watchify);

        var bundle = function() {
            src.bundle()
                .pipe(source(name))
                .pipe(gulp.dest(dst));
        };
        src.on('update', bundle);
        src.on('error', function(err) { console.log('Error: ' + err.message); });
        bundle();
    };
    var _bCache = {};
    var _bPackageCache = {};

    // vendors
    var vendorsBundle = browserify({
        entries: './widgets/base/base.js',
        cache: _bCache,
        packageCache: _bPackageCache
    });
    vendors.map(function(v) {
        vendorsBundle.require(v);
    });
    build('vendors.js', vendorsBundle, '/path/to/dst');

    // entries
    return gulp.src('path/to/src', {read: false})
        .pipe(mapStream(function(file, cb) {
            var input = path.relative(file.cwd, file.path);
            var output = path.relative(file.base, file.path);
            var b = browserify({
                entries: input,
                cache: _bCache,
                packageCache: _bPackageCache,
                paths: ['widgets/'],
                debug: true
            }).external(vendors);
            build(output, b, '/path/to/dst');
        }));
});
