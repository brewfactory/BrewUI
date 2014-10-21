/*
 * App
 *
 * @module app
 */

'use strict';

var debug = require('debug')('BrewUI:app');

var Context = require('./lib/Context');
var Application = require('./components/Application.jsx');
var routes = require('./config/routes');

var findBrewLogAction = require('./actions/logs/findBrew');

// Register stores
Context.registerStore(require('./stores/ApplicationStore'));
Context.registerStore(require('./stores/BrewStore'));
Context.registerStore(require('./stores/BrewerStore'));
Context.registerStore(require('./stores/LogStore'));


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

  this.context.getActionContext().executeAction(findBrewLogAction);
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
