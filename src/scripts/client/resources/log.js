/*
 * Resource brew
 *
 * @module brew
 */

var request = require('superagent');
var APIConstants = require('../constants/APIConstants');


/*
 * Find
 *
 * @method find
 * @param {Object} options
 */
function find() {
  return new Promise(function (resolve, reject) {
    request
      .get(APIConstants.Endpoints.Log.find)
      .set('Accept', 'application/json')
      .end(function (res) {
        if (!res.ok) {
          return reject();
        }

        resolve(res.body);
      });
  });
}


/*
 * Find one
 *
 * @method findOne
 * @param {Object} options
 */
function findOne(options) {
  options = options || {};

  return new Promise(function (resolve, reject) {

    request
      .get(APIConstants.Endpoints.Log.find + options.id)
      .set('Accept', 'application/json')
      .end(function (res) {
        if (!res.brews) {
          return reject();
        }

        resolve(res.brews);
      });
  });
}


// Public
exports.find = find;
exports.findOne = findOne;
