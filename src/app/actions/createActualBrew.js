'use strict';

var debug = require('debug')('BrewUI:createMessageAction');
var BrewConstants = require('../constants/BrewConstants');

module.exports = function (context, payload, done) {
  var brew = {
    name: payload.name,
    phases: payload.phases,
    startTime: payload.startTime,
    state: payload.state
  };

  debug('dispatching RECEIVE_BREW', brew);

  context.dispatch(BrewConstants.ActionTypes.RECEIVE_BREW, brew);

  done();
};
