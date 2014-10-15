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
BrewerStore.handlers[BrewerConstants.ActionTypes.RECEIVE_TEMPERATURE] = 'handleTemperature';
BrewerStore.handlers[BrewerConstants.ActionTypes.RECEIVE_PWM] = 'handlePWM';


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
 * Handle temperature
 *
 * @method handleTemperature
 * @param {Number} temperature
 */
BrewerStore.prototype.handleTemperature = function (temperature) {
  this.temperature = temperature;

  this.emit('change');
};


/*
 * Handle pwm
 *
 * @method handleBrew
 * @param {Number} pwm
 */
BrewerStore.prototype.handlePWM = function (pwm) {
  this.pwm = pwm;

  this.emit('change');
};

module.exports = BrewerStore;
