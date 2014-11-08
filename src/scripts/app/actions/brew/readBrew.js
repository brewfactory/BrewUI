'use strict';

var debug = require('debug')('BrewUI:action');
var BrewConstants = require('../../constants/BrewConstants');

module.exports = function (context, payload, done) {
  var brewFetcher = context.fetcher.get('brew');

  debug('dispatching READ_BREW');

  context.dispatch(BrewConstants.ActionTypes.READ_BREW);

  // Read
  brewFetcher.read()
    .then(function (brew) {
      debug('dispatching READ_BREW_SUCCESS', brew);
      context.dispatch(BrewConstants.ActionTypes.READ_BREW_SUCCESS, brew);

      if(typeof done === 'function') {
        done();
      }
    })
    .catch(function (err) {
      debug(err);

      debug('dispatching READ_BREW_FAILURE');
      context.dispatch(BrewConstants.ActionTypes.READ_BREW_FAILURE);

      if(typeof done === 'function') {
        done();
      }
    });
};
