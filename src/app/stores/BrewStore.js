/*
 * Brew store
 *
 * @module BrewStore
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var BrewConstants = require('../constants/BrewConstants');

/*
 * Application store
 *
 * @constructor ApplicationStore
 * @param {Object} dispatcher
 */
function BrewStore() {
  this.actualBrew = {
    name: null,
    phases: [],
    startTime: null,
    state: null
  };
}

// Configure store
BrewStore.storeName = 'BrewStore';
BrewStore.handlers = {};
BrewStore.handlers[BrewConstants.ActionTypes.RECEIVE_BREW] = 'receiveBrew';

BrewStore.brewStates = {
  PAUSED: 'paused'
};

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
    actualBrew: this.actualBrew
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
  this.actualBrew = state.actualBrew;
};


/*
 * handleBrewReceive
 *
 * @method handleBrewReceive
 * @param {Object} brew
 */
BrewStore.prototype.receiveBrew = function (brew) {
  this.actualBrew = {
    name: brew.name,
    phases: brew.phases,
    startTime: brew.startTime,
    state: brew.state
  };

  this.emit('change');
};


module.exports = BrewStore;
