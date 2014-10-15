/*global document, window */

'use strict';

var React = require('react/addons');
var debug = require('debug');

var Application = require('../app/app');

var bootstrapDebug = debug('App');
var App = App || {};
var dehydratedState = App && App.Context;     // Sent from the server

var application;
var app;
var mountNode;

window.React = React;                         // For chrome dev tool support
debug.enable('*');

var fetcher = require('../app/lib/Fetcher');

// Register fetchers
fetcher.register('brew', require('./fetchers/brew'));

bootstrapDebug('rehydrating app');
application = new Application({
  fetcher: fetcher,
  initialState: dehydratedState
});
window.context = application.context;

app = application.getComponent();
mountNode = document.getElementById('app');

bootstrapDebug('React Rendering');

React.renderComponent(app, mountNode, function () {
  bootstrapDebug('React Rendered');
});

// TODO: test only
var createBrew = require('./../app/actions/createBrew');
setTimeout(function () {
  application.getActionContext().executeAction(createBrew, {
    name: 'Sample IPA',
    phases: [{min:10, temp:1}],
    startTime: new Date()
  });
}, 1000);
