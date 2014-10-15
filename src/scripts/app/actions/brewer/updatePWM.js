'use strict';

var debug = require('debug')('BrewUI:action');
var BrewerConstants = require('../../constants/BrewerConstants');

module.exports = function (context, payload) {
  debug('dispatching RECEIVE_PWM', payload);

  context.dispatch(BrewerConstants.ActionTypes.RECEIVE_PWM, payload.pwm);
};
