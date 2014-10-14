/*
 * Context
 *
 * @module Context
 */
'use strict';

var Dispatcher = require('dispatchr')();
var Router = require('routr');


/*
 * Context
 *
 * @constructor Context
 * @param {Object} options
 */
function Context(options) {
  options = options || {};

  this.dispatcher = new Dispatcher({});
  this.router = new Router(options.routes);
  this.fetcher = options.fetcher || null;
  this.actionContext = this.getActionContext();
  this.componentContext = this.getComponentContext();
}

Context.registerStore = Dispatcher.registerStore.bind(Dispatcher);


/*
 * Get component context
 *
 * @method getComponentContext
 * @return {Object} context
 */
Context.prototype.getComponentContext = function () {
  var _this = this;

  return {
    executeAction: function (actionController, payload) {
      actionController(_this.actionContext, payload, function (err) {
        if (err) {
          console.error(err);
        }
      });
    },
    getStore: _this.dispatcher.getStore.bind(_this.dispatcher),
    makePath: _this.router.makePath.bind(_this.router)
  };
};


/*
 * Get action context
 *
 * @method getActionContext
 * @return {Object} context
 */
Context.prototype.getActionContext = function () {
  var _this = this;

  return {
    dispatch: _this.dispatcher.dispatch.bind(_this.dispatcher),
    executeAction: function (actionController, payload, done) {
      actionController(_this.actionContext, payload, done);
    },
    fetcher: _this.fetcher,
    getStore: _this.dispatcher.getStore.bind(_this.dispatcher),
    router: _this.router
  };
};


/*
 * Dehydrate
 *
 * @method dehydrate
 * @return {Object}
 */
Context.prototype.dehydrate = function () {
  return {
    dispatcher: this.dispatcher.dehydrate()
  };
};


/*
 * Rehydrate
 *
 * @method rehydrate
 */
Context.prototype.rehydrate = function (obj) {
  this.dispatcher.rehydrate(obj.dispatcher || {});
};

module.exports = Context;
