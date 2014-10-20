'use strict';

var debug = require('debug')('BrewUI:action');
var BrewConstants = require('../../constants/BrewConstants');

module.exports = function (context, payload, done) {
  var brew = {
    name: payload.name,
    phases: payload.phases,
    startTime: payload.startTime
  };

  var brewFetcher = context.fetcher.get('brew');

  debug('dispatching CREATE_BREW', brew);

  context.dispatch(BrewConstants.ActionTypes.CREATE_BREW, brew);

  // Create
  brewFetcher.create(brew, {})
    .then(function () {
      //debug('dispatching CREATE_BREW_SUCCESS', brew);
      //context.dispatch('RECEIVE_MESSAGES_SUCCESS', [brew]);

      if(typeof done === 'function') {
        done();
      }
    })
    .catch(function (err) {
      debug(err);

      //debug('dispatching CREATE_BREW_FAILURE', brew);
      //context.dispatch('RECEIVE_MESSAGES_FAILURE', [brew]);

      if(typeof done === 'function') {
        done();
      }
    });
};
