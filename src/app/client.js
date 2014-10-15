/*global document, window */

'use strict';

var React = require('react/addons');
var debug = require('debug');

var Application = require('./app');

var bootstrapDebug = debug('App');
var App = App || {};
var dehydratedState = App && App.Context;     // Sent from the server

var application;
var app;
var mountNode;

window.React = React;                         // For chrome dev tool support
debug.enable('*');

bootstrapDebug('rehydrating app');
application = new Application({
  initialState: dehydratedState
});
window.context = application.context;

app = application.getComponent();
mountNode = document.getElementById('app');

bootstrapDebug('React Rendering');

React.renderComponent(app, mountNode, function () {
  bootstrapDebug('React Rendered');
});
