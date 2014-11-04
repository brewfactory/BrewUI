/*global document, window */

'use strict';

var React = require('react/addons');
var debug = require('debug');

var Application = require('../app/app');
var clientDebug = debug('BrewUI:client');
var navigateAction = require('flux-router-component').navigateAction;
var dehydratedState = global.App && global.App.Context;     // Sent from the server
var APIConstants = require('./constants/APIConstants');

var application;
var app;
var mountNode;

window.React = React;                         // For chrome dev tool support
debug.enable('BrewUI*');

var fetcher = require('../app/lib/Fetcher');

// Register fetchers
fetcher.register('brew', require('./fetchers/brew'));
fetcher.register('log', require('./fetchers/log'));

clientDebug('rehydrating app');

application = new Application({
  fetcher: fetcher,
  initialState: dehydratedState
});

application.init();

window.context = application.context;

app = application.getComponent();
mountNode = document.getElementById('app');

// Load current path from window location
if(!dehydratedState) {
  application.getActionContext().executeAction(navigateAction, {
    path: window.location.pathname
  }, function () { });
}

clientDebug('React Rendering');

React.render(app, mountNode, function () {
  clientDebug('React Rendered');
});

// Use WebSockets as data source
require('./module/WebSocket')({
  server: APIConstants.WebSocket,
  context: application.getActionContext()
});
