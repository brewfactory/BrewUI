/*
 * Main
 */

var path = require('path');
var fs = require('fs');

var debug = require('debug')('BrewUI');
var Promise = require('bluebird');
var _ = require('lodash-node');

var pkg = require('./package.json');


/*
 * Build
 *
 * @method build
 * @param {String} distPath
 * @param {Boolean} force optional
 * @return {Promise}
 */
function build(distPath, force) {
  return new Promise(function (resolve, reject) {

    // Check for dev dependencies
    var isDevDependencies = _.every(pkg.devDependencies, function (version, name) {
      var available = true;

      try {
        require.resolve(name);
      } catch(e) {
        available = false;
      }

      return available;
    });

    if(!isDevDependencies) {
      return reject('Install "devDependencies" first.');
    }

    var gulpfile = require('./gulpfile');
    var manifestPath = path.join(distPath, 'manifest.json');

    var manifest;

    // Check for manifest
    if(fs.existsSync(manifestPath)) {
      manifest = require(manifestPath);
    }

    // Do not build if the same version and not forced
    if(force !== true && manifest && manifest.version === pkg.version) {
      debug('Already built');
      return resolve(false);
    }

    debug('Start build');
    gulpfile.build(distPath, function (err) {
      if(err) {
        debug('Build error', err);
        return reject(err);
      }

      debug('Build is done');
      resolve(true);
    });
  });
}


/*
 * Extent to isomorphic
 *
 * requires jsx support
 *
 * @method extendToIsomorphic
 */
function extendToIsomorphic () {
  debug('Generate Isomorphic interfaces: .app, .client');

  exports.App = require('./src/scripts/app/app');
  exports.Fetcher = require('./src/scripts/app/lib/Fetcher');

  exports.React = require('react');
  exports.actions = {
    navigateAction: require('flux-router-component').navigateAction
  };
}


/*
 * Get static path
 *
 * @method getStaticPath
 */
function getStaticPath () {
  return path.join(__dirname, 'build');
}

// Main interface
exports.build = build;
exports.routes = require('./src/scripts/app/config/routes');
exports.isomorphic = extendToIsomorphic;
exports.getStaticPath = getStaticPath;
