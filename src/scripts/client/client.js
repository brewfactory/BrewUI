/*global document, window */

'use strict';

var React = require('react/addons');
var debug = require('debug');

var Application = require('../app/app');
var clientDebug = debug('BrewUI:client');
var App = App || {};
var dehydratedState = App && App.Context;     // Sent from the server

var application;
var app;
var mountNode;

window.React = React;                         // For chrome dev tool support
debug.enable('BrewUI*');

var fetcher = require('../app/lib/Fetcher');

// Register fetchers
fetcher.register('brew', require('./fetchers/brew'));

clientDebug('rehydrating app');

application = new Application({
  fetcher: fetcher,
  initialState: dehydratedState
});
window.context = application.context;

app = application.getComponent();
mountNode = document.getElementById('app');

clientDebug('React Rendering');

React.renderComponent(app, mountNode, function () {
  clientDebug('React Rendered');
});

// Use WebSockets as data source
require('./module/WebSocket')({
  server: 'http://localhost:9003',
  context: application.getActionContext()
});
