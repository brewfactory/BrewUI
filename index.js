/*
 * Main
 */

var gulpfile = require('./gulpfile');
var Promise = require('bluebird');


/*
 * Build
 *
 * @method build
 * @param {String} path
 * @param {Boolean} force optional
 * @return {Promise}
 */
function build(path, force) {
  return new Promise(function (resolve, reject) {
    if(force !== true) {
      // TODO: check for build necessary
      return resolve();
    }

    gulpfile.build(path, function (err) {
      if(err) {
        return reject(err);
      }

      resolve();
    });
  });
}


/*
 * Extent to isomorphic
 *
 * requires jsx support
 */
function extendToIsomorphic () {
  exports.app = require('./src/scripts/app/app');
  exports.client = require('./src/scripts/client/client');
}

// Main interface
exports.build = build;
exports.isomorphic = extendToIsomorphic;
