/*
 * App
 *
 * @module app
 */

'use strict';

var React = require('react');
var async = require('async');
var debug = require('debug')('BrewUI:app');

var Context = require('./lib/Context');
var Application = React.createFactory(require('./components/Application.jsx'));
var routes = require('./config/routes');

var readBrewAction = require('./actions/brew/readBrew');
var findBrewLogAction = require('./actions/logs/findBrew');
var findOneBrewLogAction = require('./actions/logs/findOneBrew');

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
}


/*
 * Initialise
 *
 * @method init
 * @return {Promise}
 */
App.prototype.init = function () {
  var _this = this;

  debug('Initialise application');

  return new Promise(function (resolve, reject) {
    var actionContext = _this.context.getActionContext();

    // Load store data
    async.parallel({

      // Load brew
      brew: function loadBrew(cb) {
        actionContext.executeAction(readBrewAction, {}, cb);
      },

      // Load log
      log: function loadLog (logCb) {
        var LogStore = actionContext.getStore('LogStore');

        // Do not get logs when it's already loaded
        if(LogStore.brewLogs.length) {
          return logCb();
        }

        async.waterfall([

          // Find brew logs
          function findLogs(cb) {
            actionContext.executeAction(findBrewLogAction, {}, cb);
          },

          // Find selected brew
          function findOneLog(brews, cb) {
            if(!brews.length) {
              return cb();
            }

            actionContext.executeAction(findOneBrewLogAction, { id: brews[0]._id }, cb);
          }

        ], logCb);
      }
    }, function (err) {
      if(err) {
        return reject(err);
      }

      resolve();
    });
  });
};


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
