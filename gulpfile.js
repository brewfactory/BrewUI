'use strict';

var path = require('path');

var gulp = require('gulp');
var webpack = require('webpack');

// Load plugins
var $ = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');

var WATCH = true;
var RELEASE = false;
var DEST = './build/';

// Bundle
gulp.task('bundle', function (cb) {
  var started = false;
  var config = require('./config/webpack.js')(RELEASE);
  var bundler = webpack(config);

  function bundle(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    $.util.log('[webpack]', stats.toString({colors: true}));

    if (!started) {
      started = true;
      return cb();
    }
  }

  if (WATCH) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});

// HTML
gulp.task('html', function () {
  return gulp.src('src/views/*.html')
    .pipe($.useref())
    .pipe(gulp.dest(DEST))
    .pipe($.size());
});

// Images
gulp.task('images', function () {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest(path.join(DEST, 'images')))
    .pipe($.size());
});

// CSS style sheets
gulp.task('styles', function() {
  return gulp.src('./src/styles/**/*.css')
    .pipe($.csso())
    .pipe(gulp.dest(path.join(DEST, 'styles')))
    .pipe($.size({title: 'styles'}));
});

// Fonts
gulp.task('fonts', function () {
  return gulp.src(mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(DEST, 'fonts')))
    .pipe($.size());
});

// Clean
gulp.task('clean', function () {
  return gulp.src([
      path.join(DEST, 'styles'),
      path.join(DEST, 'images'),
      path.join(DEST, 'views'),
      path.join(DEST, 'scripts')
    ],
    {read: false}).pipe($.clean());
});


// HTML Bundle
gulp.task('htmlBundle', ['bower'], function () {
  var assets = $.useref.assets();

  return gulp.src('./src/views/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(DEST));
});

// Build
gulp.task('build', ['clean', 'html', 'htmlBundle', 'styles', 'bundle', 'images', 'fonts']);

// Default task
gulp.task('default', ['clean'], function () {
  RELEASE = true;
  WATCH = false;

  gulp.start('build');
});

// Bower helper
gulp.task('bower', function () {
  gulp.src('src/bower_components/**/*.js', {base: 'src/bower_components'})
    .pipe(gulp.dest(path.join(DEST, 'bower_components')));
});

// Watch
gulp.task('serve', ['build'], function () {
  $.livereload.listen();

  WATCH = true;

  // Watch styles
  gulp.watch('src/styles/**/*.css', ['styles'])
    .on('change', $.livereload.changed);

  // Watch bower
  gulp.watch('bower.json', ['fonts'])
    .on('change', $.livereload.changed);

  // Watch .html files
  gulp.watch('src/views/**/*.html', ['html', 'htmlBundle'])
    .on('change', $.livereload.changed);

  // Watch image files
  gulp.watch('src/images/**/*', ['images'])
    .on('change', $.livereload.changed);

  $.connect.server({
    root: ['build', 'tmp'],
    port: 8000
  });
});
