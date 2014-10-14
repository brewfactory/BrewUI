/*
 * App
 *
 * @module app
 */

'use strict';

var debug = require('debug');

var Context = require('./lib/Context');
var ApplicationStore = require('./stores/ApplicationStore');
var Application = require('./components/Application.jsx');
var routes = require('./config/routes');

var bootstrapDebug = debug('App');

Context.registerStore(ApplicationStore);

/*
 * App
 *
 * @constructor App
 * @param {Object} initialState
 *
 */
function App(initialState) {
  debug('Creating context');

  this.context = new Context({
    routes: routes
  });

  if (initialState) {
    bootstrapDebug('rehydrating context');
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

module.exports = App;
