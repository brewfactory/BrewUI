'use strict';

var path = require('path');

var gulp = require('gulp');
var webpack = require('webpack');
var runSequence = require('run-sequence');
var modRewrite = require('connect-modrewrite');

var pkg = require('./package.json');

// Load plugins
var $ = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');

var WATCH = true;
var RELEASE = false;
var DEST = './build/';
var API_HOST = process.env.API || 'http://localhost:3000';

// Bundle
gulp.task('bundle', function (cb) {
  var started = false;
  var config = require('./config/webpack.js')(DEST, RELEASE);
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

// Images
gulp.task('images', function () {
  return gulp.src(path.join(__dirname, 'src/images/**/*'))
    .pipe(gulp.dest(path.join(DEST, 'images')))
    .pipe($.size());
});

// CSS style sheets
gulp.task('styles', function () {
  return gulp.src(path.join(__dirname, 'src/styles/**/*.css'))
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
    path.join(DEST, 'fonts'),
    path.join(DEST, 'styles'),
    path.join(DEST, 'images'),
    path.join(DEST, 'views'),
    path.join(DEST, 'scripts'),
    path.join(DEST, 'layout.html')
  ], {
    read: false
  }).pipe($.clean({
    force: true
  }));
});


// HTML Bundle
gulp.task('html', ['bower'], function () {
  return gulp.src(path.join(__dirname, './src/views/**/*.html'))
    .pipe($.usemin({
      assetsDir: path.join(__dirname, 'src'),
      css: [$.csso()],
      js: [$.uglify()]
    }))
    .pipe(gulp.dest(DEST));
});


// Manifest
gulp.task('manifest', function () {
  return gulp.src(path.join(__dirname, './manifest.json'))
    .pipe($.jsonEditor({
      name: pkg.name,
      version: pkg.version,
      date: new Date()
    }))
    .pipe(gulp.dest(DEST));
});


// Build
gulp.task('build', function (callback) {
  runSequence('clean', 'html', 'bundle', ['styles', 'images'], 'manifest',
    callback);
});

// Default task
gulp.task('default', ['clean'], function () {
  RELEASE = true;
  WATCH = false;

  gulp.start('build');
});

// Bower helper
gulp.task('bower', function () {
  gulp.src(path.join(__dirname, 'src/bower_components/**/*.js'), {
    base: path.join(__dirname, 'src/bower_components')
  })
    .pipe(gulp.dest(path.join(DEST, 'bower_components')));
});

// Watch
gulp.task('watch', function () {
  $.livereload.listen();

  // Watch styles
  gulp.watch('src/styles/**/*.css', ['styles'])
    .on('change', $.livereload.changed);

  // Watch bower
  gulp.watch('bower.json', ['fonts'])
    .on('change', $.livereload.changed);

  // Watch .html files
  gulp.watch('src/views/**/*.html', ['html'])
    .on('change', $.livereload.changed);

  // Watch image files
  gulp.watch('src/images/**/*', ['images'])
    .on('change', $.livereload.changed);
});


// Serve
gulp.task('connect', function () {
  if(!$.connect) {
    return console.error('Run "npm install" first');
  }

  $.connect.server({
    root: ['build', 'tmp'],
    port: process.env.PORT || 9000,
    livereload: true,
    fallback: path.join(DEST, 'layout.html'),
    middleware: function() {
      return [
        modRewrite([
          '^/api/(.*)$ ' + API_HOST + '/api/$1 [P]',
          '^/socket.io/(.*)$ ' + API_HOST + '/socket.io/$1 [P]'
        ])
      ];
    }
  });
});

// Serve
gulp.task('serve', function (callback) {
  WATCH = true;

  runSequence('build', 'watch', 'connect', callback);
});


/*
 * Build
 *
 * @method build
 * @param {String} outputPath
 * @param {Boolean} build
 */
function build(outputPath, callback) {
  DEST = outputPath || DEST;

  gulp.start('default', callback);
}


// Public interface
exports.build = build;
