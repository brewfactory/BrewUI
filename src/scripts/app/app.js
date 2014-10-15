/*
 * App
 *
 * @module app
 */

'use strict';

var debug = require('debug');

var Context = require('./lib/Context');
var Application = require('./components/Application.jsx');
var routes = require('./config/routes');

var ApplicationStore = require('./stores/ApplicationStore');
var BrewStore = require('./stores/BrewStore');

// Register stores
Context.registerStore(ApplicationStore);
Context.registerStore(BrewStore);


/*
 * App
 *
 * @constructor App
 * @param {Object} initialState
 *
 */
function App(options) {
  options = options || {};

  var initialState = options.initialState;
  var fetcher = options.fetcher;

  debug('Creating context');
  this.context = new Context({
    routes: routes,
    fetcher: fetcher
  });

  if (initialState) {
    debug('rehydrating context');
    this.context.rehydrate(initialState);
  }
}


/*
 * Get component
 *
 * @method getComponent
 * @return {Object}
 */
App.prototype.getComponent = function () {
  debug('Creating Application component');

  // Ignore because JSX
  var appComponent = Application({                      // jshint ignore:line
    context: this.context.getComponentContext()
  });

  debug('Rendering Application component');

  return appComponent;
};


/*
 * Get context
 *
 * @method getContext
 * @return {Object}
 */
App.prototype.getActionContext = function () {
  return this.context.getActionContext();
};

module.exports = App;
