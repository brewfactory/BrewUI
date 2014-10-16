/*
 * Action: receive pwm
 *
 * @module receivePWM
 */

'use strict';

var debug = require('debug')('BrewUI:action');
debug.log = console.debug.bind(console);

var BrewerConstants = require('../../constants/BrewerConstants');

module.exports = function (context, payload) {
  //debug('dispatching RECEIVE_PWM', payload);

  context.dispatch(BrewerConstants.ActionTypes.RECEIVE_PWM, payload.pwm);
};
