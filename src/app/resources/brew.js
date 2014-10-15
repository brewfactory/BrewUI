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
 * @callback
 */
function create(options, callback) {
  options = options || {};

  var brew = options.brew;

  request
    .post(APIConstants.Endpoints.Brew.create)
    .send({
      name: brew.name,
      startTime: brew.startTime,
      phases: brew.phases
    })
    .set('Accept', 'application/json')
    .end(callback);
}

// Public
exports.create = create;
exports.STATE = STATE;
