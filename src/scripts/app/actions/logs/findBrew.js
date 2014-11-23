'use strict';

var debug = require('debug')('BrewUI:action');
var LogConstants = require('../../constants/LogConstants');

module.exports = function(context, payload, done) {
  var logFetcher = context.fetcher.get('log');

  debug('dispatching FIND_LOG');

  context.dispatch(LogConstants.ActionTypes.FIND_LOG);

  // Create
  logFetcher.find()
    .then(function(resp) {
      var brews = resp.brews;

      debug('dispatching FIND_LOG_SUCCESS', brews);
      context.dispatch(LogConstants.ActionTypes.FIND_LOG_SUCCESS, brews);

      if (typeof done === 'function') {
        done(null, brews);
      }
    })
    .catch(function(err) {
      debug('FIND_LOG error', err);

      if (typeof done === 'function') {
        debug(err);
        done(err);
      }
    });
};
