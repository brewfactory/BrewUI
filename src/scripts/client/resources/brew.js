/*
 * Resource brew
 *
 * @module brew
 */

var request = require('superagent');
var APIConstants = require('../constants/APIConstants');

var STATE = {
  paused: 'paused'
};


/*
 * Create
 *
 * @method create
 * @param {Object} brew
 */
function create(options) {
  options = options || {};

  var brew = options.brew;

  return new Promise(function (resolve, reject) {

    request
      .post(APIConstants.Endpoints.Brew.create)
      .send({
        name: brew.name,
        startTime: brew.startTime,
        phases: brew.phases
      })
      .set('Accept', 'application/json')
      .end(function (res) {
        if (!res.ok) {
          return reject();
        }

        resolve();
      });
  });
}


/*
 * Pause
 *
 * @method pause
 */
function pause() {

  return new Promise(function (resolve, reject) {

    request
        .patch(APIConstants.Endpoints.Brew.pause)
        .set('Accept', 'application/json')
        .end(function (res) {
          if (!res.ok) {
            return reject();
          }

          resolve();
        });
  });
}


/*
 * Stop
 *
 * @method pause
 */
function stop() {

  return new Promise(function (resolve, reject) {

    request
        .patch(APIConstants.Endpoints.Brew.stop)
        .set('Accept', 'application/json')
        .end(function (res) {
          if (!res.ok) {
            return reject();
          }

          resolve();
        });
  });
}

// Public
exports.create = create;
exports.pause = pause;
exports.stop = stop;
exports.STATE = STATE;
