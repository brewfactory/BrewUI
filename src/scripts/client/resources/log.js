/*
 * Resource brew
 *
 * @module brew
 */

var url = require('rising-url');

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
    var URL = url.format(APIConstants.Host, APIConstants.Endpoints.Log.find);

    request
      .get(URL)
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
    var URL = url.format(APIConstants.Host, APIConstants.Endpoints.Log.findOne, {
      param: {
        id: options.id
      }
    });

    request
      .get(URL)
      .set('Accept', 'application/json')
      .end(function (res) {
        if (!res.ok) {
          return reject();
        }

        resolve(res.body);
      });
  });
}


// Public
exports.find = find;
exports.findOne = findOne;
