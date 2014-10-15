/*
 * Brew fetcher
 */

var request = require('superagent');
var APIConstants = require('../constants/APIConstants');

module.exports = {
  name: 'brew',

  // Create brew
  create: function(req, resource, params, body, config, callback) {
    request
      .post(APIConstants.Endpoints.Brew.create)
      .send({
        name: 'Test IPA',
        startTime: new Date(),
        phases: []
      })
      .set('Accept', 'application/json')
      .end(callback);
  }

  //At least one of the CRUD methods is required
  //read: function(req, resource, params, config, callback) {}
  //update: function(resource, params, body, config, callback) {},
  //del: function(resource, params, config, callback) {}

};
