/*
 * Brewer store
 *
 * @module BrewerStore
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var BrewerConstants = require('../constants/BrewerConstants');

/*
 * Brewer store
 *
 * @constructor ApplicationStore
 * @param {Object} dispatcher
 */
function BrewerStore() {
  this.temperature = null;
  this.pwm = null;
}

// Configure store
BrewerStore.storeName = 'BrewerStore';
BrewerStore.handlers = {};
BrewerStore.handlers[BrewerConstants.ActionTypes.RECEIVE_TEMPERATURE] = 'temperatureUpdated';
BrewerStore.handlers[BrewerConstants.ActionTypes.RECEIVE_PWM] = 'pwmUpdated';


// Inherit ApplicationStore from the EventEmitter
util.inherits(BrewerStore, EventEmitter);


/*
 * Get state
 *
 * @method getState
 * @return {Object} state
 */
BrewerStore.prototype.getState = function () {
  return {
    temperature: this.temperature,
    pwm: this.pwm
  };
};


/*
 * Dehydrate
 *
 * @method dehydrate
 * @return {Object} state
 */
BrewerStore.prototype.dehydrate = function () {
  return this.getState();
};


/*
 * Rehydrate
 *
 * @method rehydrate
 * @param {Object} state
 */
BrewerStore.prototype.rehydrate = function (state) {
  this.temperature = state.temperature;
  this.pwm = state.pwm;
};


/*
 * Temperature updated
 *
 * @method temperatureUpdated
 * @param {Number} temperature
 */
BrewerStore.prototype.temperatureUpdated = function (temperature) {
  this.temperature = temperature;

  this.emit('change');
};


/*
 * PWM updated
 *
 * @method pwmUpdated
 * @param {Number} pwm
 */
BrewerStore.prototype.pwmUpdated = function (pwm) {
  this.pwm = pwm;

  this.emit('change');
};

module.exports = BrewerStore;
