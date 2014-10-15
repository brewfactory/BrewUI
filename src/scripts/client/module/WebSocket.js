
// Actions
var updateTemperature = require('./../../app/actions/brewer/updateTemperature');

/*
 * init
 *
 * @method init
 */
function init (options) {
  options = options || {};

  var server = options.server;
  var context = options.context;

  var socket = require('socket.io-client')(server);

  socket.on('temperature_changed', function (temp) {
    if(isNaN(temp)) {
      return;
    }

    var roundedTemp = Math.round(temp * 100) / 100;

    context.executeAction(updateTemperature, {
      temperature: roundedTemp
    });
  });
}

module.exports = init;
