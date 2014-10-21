'use strict';

var debug = require('debug')('BrewUI:action');
var LogConstants = require('../../constants/LogConstants');

module.exports = function (context, payload, done) {
  var logFetcher = context.fetcher.get('log');

  debug('dispatching FIND_LOG');

  context.dispatch(LogConstants.ActionTypes.FIND_LOG);

  // Create
  logFetcher.find()
    .then(function (resp) {
      var brews = resp.brews;

      logFetcher.findOne({ id: brews[0]._id }).then(function (selectedResp) {
        var selectedBrew = selectedResp.brews;

        debug('dispatching FIND_LOG_SUCCESS', brews);

        context.dispatch(LogConstants.ActionTypes.FIND_ONE_LOG_SUCCESS, selectedBrew);
        context.dispatch(LogConstants.ActionTypes.FIND_LOG_SUCCESS, brews);

        if(typeof done === 'function') {
          done();
        }
      });
    })
    .catch(function (err) {
      debug('FIND_LOG error', err);

      if(typeof done === 'function') {
        done();
      }
    });
};