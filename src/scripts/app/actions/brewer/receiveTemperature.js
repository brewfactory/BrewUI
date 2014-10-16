/*
 * Action: receive temperature
 *
 * @module receiveTemperature
 */

'use strict';

var debug = require('debug')('BrewUI:action');
debug.log = console.debug.bind(console);

var BrewerConstants = require('../../constants/BrewerConstants');

module.exports = function (context, payload) {
  //debug('dispatching RECEIVE_TEMPERATURE', payload);

  context.dispatch(BrewerConstants.ActionTypes.RECEIVE_TEMPERATURE, payload.temperature);
};
