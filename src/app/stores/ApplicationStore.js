/*
 * Application store
 *
 * @module ApplicationStore
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var routes = require('../config/routes');
var _ = require('lodash-node');


/*
 * Application store
 *
 * @constructor ApplicationStore
 * @param {Object} dispatcher
 */
function ApplicationStore() {
  this.pages = _.transform(routes, function (result, route, key) {
    result[key] = {
      text: route.name,
      route: route.page
    };
  });

  this.currentPageName = null;
  this.currentPage = null;
  this.currentRoute = null;
}

// Configure store
ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
  CHANGE_ROUTE_START: 'handleNavigate'
};

// Inherit ApplicationStore from the EventEmitter
util.inherits(ApplicationStore, EventEmitter);


/*
 * Handle navigate
 *
 * @method handleNavigate
 * @param {Object} route
 */
ApplicationStore.prototype.handleNavigate = function (route) {
  var pageName = route.config.page;
  var page = this.pages[pageName];

  if (pageName === this.getCurrentPageName()) {
    return;
  }

  this.currentPageName = pageName;
  this.currentPage = page;
  this.currentRoute = route;
  this.emit('change');
};


/*
 * Get current page
 *
 * @method getCurrentPageName
 * @return {String}
 */
ApplicationStore.prototype.getCurrentPageName = function () {
  return this.currentPageName;
};


/*
 * Get state
 *
 * @method getState
 * @return {Object} state
 */
ApplicationStore.prototype.getState = function () {
  return {
    currentPageName: this.currentPageName,
    currentPage: this.currentPage,
    pages: this.pages,
    route: this.currentRoute
  };
};


/*
 * Dehydrate
 *
 * @method dehydrate
 * @return {Object} state
 */
ApplicationStore.prototype.dehydrate = function () {
  return this.getState();
};


/*
 * Rehydrate
 *
 * @method rehydrate
 * @param {Object} state
 */
ApplicationStore.prototype.rehydrate = function (state) {
  this.currentPageName = state.currentPageName;
  this.currentPage = state.currentPage;
  this.pages = state.pages;
  this.currentRoute = state.route;
};

module.exports = ApplicationStore;
