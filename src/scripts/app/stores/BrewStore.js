/*
 * Brew store
 *
 * @module BrewStore
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var BrewConstants = require('../constants/BrewConstants');

/*
 * Brew store
 *
 * @constructor ApplicationStore
 * @param {Object} dispatcher
 */
function BrewStore() {
  this.brew = {
    name: null,
    phases: [],
    startTime: null,
    state: null,
    paused: false
  };
}

// Configure store
BrewStore.storeName = 'BrewStore';
BrewStore.handlers = {};
BrewStore.handlers[BrewConstants.ActionTypes.READ_BREW_SUCCESS] = 'brewUpdated';
BrewStore.handlers[BrewConstants.ActionTypes.RECEIVE_BREW] = 'brewUpdated';
BrewStore.handlers[BrewConstants.ActionTypes.CREATE_BREW] = 'brewUpdated';


// Inherit ApplicationStore from the EventEmitter
util.inherits(BrewStore, EventEmitter);


/*
 * Get state
 *
 * @method getState
 * @return {Object} state
 */
BrewStore.prototype.getState = function () {
  return {
    brew: this.brew
  };
};


/*
 * Dehydrate
 *
 * @method dehydrate
 * @return {Object} state
 */
BrewStore.prototype.dehydrate = function () {
  return this.getState();
};


/*
 * Rehydrate
 *
 * @method rehydrate
 * @param {Object} state
 */
BrewStore.prototype.rehydrate = function (state) {
  this.brew = state.brew;
};


/*
 * Brew updated
 *
 * @method brewUpdated
 * @param {Object} brew
 */
BrewStore.prototype.brewUpdated = function (brew) {
  this.brew = {
    name: brew.name,
    phases: brew.phases,
    startTime: brew.startTime,
    state: brew.state,
    paused: !!brew.paused
  };

  this.emit('change');
};


module.exports = BrewStore;
