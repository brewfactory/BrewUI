'use strict';

var debug = require('debug')('BrewUI:createMessageAction');
var BrewConstants = require('../constants/BrewConstants');

var brewResource = require('../resources/brew');


module.exports = function (context, payload, done) {
  var brew = {
    name: payload.name,
    phases: payload.phases,
    startTime: payload.startTime
  };

  debug('dispatching CREATE_BREW', brew);

  context.dispatch(BrewConstants.ActionTypes.CREATE_BREW, brew);

  // Create
  brewResource.create({
    brew: {
      name: brew.name,
      startTime: brew.startTime,
      phases: brew.phases
    }
  }, function (err) {
    if (err) {
      debug('dispatching CREATE_BREW_FAILURE', brew);
      //context.dispatch('RECEIVE_MESSAGES_FAILURE', [brew]);
      return;
    }

    debug('dispatching CREATE_BREW_SUCCESS', brew);
    //context.dispatch('RECEIVE_MESSAGES_SUCCESS', [brew]);
    done();
  });
};
