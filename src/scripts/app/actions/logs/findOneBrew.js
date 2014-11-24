
'use strict';

var debug = require('debug')('BrewUI:action');
var LogConstants = require('../../constants/LogConstants');

module.exports = function (context, payload, done) {
  var logFetcher = context.fetcher.get('log');
  var id = payload.id;

  debug('dispatching FIND_ONE_LOG');

  context.dispatch(LogConstants.ActionTypes.FIND_ONE_LOG);

  // Create
  logFetcher.findOne({ id: id })
    .then(function (resp) {
      var brews = resp.brews;

      debug('dispatching FIND_ONE_LOG_SUCCESS', brews);
      context.dispatch(LogConstants.ActionTypes.FIND_ONE_LOG_SUCCESS, brews);

      if(typeof done === 'function') {
        done(null, brews);
      }
    })
    .catch(function (err) {
      debug('FIND_ONE_LOG error');
      debug(err);

      if(typeof done === 'function') {
        done(err);
      }
    });
};
