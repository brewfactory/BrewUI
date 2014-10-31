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

// Main interface
//exports.app = require('./src/scripts/app/app');
//exports.client = require('./src/scripts/client/client');
exports.build = build;

exports.build('../brew-ui-build').then(function () {
  console.log('DONE');
}).catch(function (err) {
  console.error(err);
});
