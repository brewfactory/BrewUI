'use strict';

var debug = require('debug')('BrewUI:action');
var BrewConstants = require('../../constants/BrewConstants');

module.exports = function (context, payload) {
  var brew = {
    name: payload.name,
    phases: payload.phases,
    startTime: payload.startTime,
    paused: payload.paused
  };

  debug('dispatching RECEIVE_BREW', brew);

  context.dispatch(BrewConstants.ActionTypes.RECEIVE_BREW, brew);
};
