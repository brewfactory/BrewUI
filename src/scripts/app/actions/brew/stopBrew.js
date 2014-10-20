'use strict';

var debug = require('debug')('BrewUI:action');
var BrewConstants = require('../../constants/BrewConstants');

module.exports = function (context, payload, done) {
    var brewFetcher = context.fetcher.get('brew');

    debug('dispatching STOP_BREW');

    context.dispatch(BrewConstants.ActionTypes.STOP_BREW);

    // Create
    brewFetcher.stop({})
        .then(function () {
            if(typeof done === 'function') {
                done();
            }
        })
        .catch(function (err) {
            debug(err);

            if(typeof done === 'function') {
                done();
            }
        });
};
