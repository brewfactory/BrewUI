'use strict';

var debug = require('debug')('BrewUI:action');
var BrewerConstants = require('../../constants/BrewerConstants');

module.exports = function (context, payload) {
  debug('dispatching RECEIVE_TEMPERATURE', payload);

  context.dispatch(BrewerConstants.ActionTypes.RECEIVE_TEMPERATURE, payload.temperature);
};
