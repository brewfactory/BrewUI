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
    state: null
  };
}

// Configure store
BrewStore.storeName = 'BrewStore';
BrewStore.handlers = {};
BrewStore.handlers[BrewConstants.ActionTypes.RECEIVE_BREW] = 'handleBrew';
BrewStore.handlers[BrewConstants.ActionTypes.CREATE_BREW] = 'handleBrew';


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
 * handleBrew
 *
 * @method handleBrew
 * @param {Object} brew
 */
BrewStore.prototype.handleBrew = function (brew) {
  this.brew = {
    name: brew.name,
    phases: brew.phases,
    startTime: brew.startTime,
    state: brew.state
  };

  this.emit('change');
};


module.exports = BrewStore;
