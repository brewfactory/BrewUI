var debug = require('debug')('BrewUI:WebSocket');

// Actions
var receiveTemperature = require('./../../app/actions/brewer/receiveTemperature');
var receivePWM = require('./../../app/actions/brewer/receivePWM');

var receiveBrew = require('./../../app/actions/brew/receiveBrew');


/*
 * init
 *
 * @method init
 */
function init(options) {
  options = options || {};

  var server = options.server;
  var context = options.context;

  var socket = require('socket.io-client')(server);


  /*
   * On temperature changed
   *
   * @method onTemperatureChanged
   * @param {Number} temp
   */
  function onTemperatureChanged(temp) {
    if (isNaN(temp)) {
      return;
    }

    var roundedTemp = Math.round(temp * 100) / 100;

    context.executeAction(receiveTemperature, {
      temperature: roundedTemp
    });
  }


  /*
   * On pwm changed
   *
   * @method onPWMChanged
   * @param {Number} pwm
   */
  function onPWMChanged(pwm) {
    if (isNaN(pwm)) {
      return;
    }

    var roundedPWM = Math.round(pwm * 100) / 100;

    context.executeAction(receivePWM, {
      pwm: roundedPWM
    });
  }


  /*
   * On brew changed
   *
   * @method onBrewChanged
   * @param {Number} brew
   */
  function onBrewChanged(brew) {
    context.executeAction(receiveBrew, brew);
  }


  // Events
  socket.on('connect', function() {
    debug('Connect: add listeners');

    socket.on('temperature_changed', onTemperatureChanged);
    socket.on('pwm_changed', onPWMChanged);
    socket.on('brew_changed', onBrewChanged);

    socket.on('disconnect', function () {
      socket.off('temperature_changed', onTemperatureChanged);
      socket.off('pwm_changed', onPWMChanged);
      socket.off('brew_changed', onBrewChanged);

      debug('Disconnect: remove listeners');
    });
  });

  socket.on('error', function (err) {
    debug('Error', err);
  });
}

module.exports = init;
