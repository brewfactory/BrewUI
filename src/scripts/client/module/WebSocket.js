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
   * On temperature changed
   *
   * @method onTemperatureChanged
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
  socket.on('temperature_changed', onTemperatureChanged);
  socket.on('pwm_changed', onPWMChanged);
  socket.on('brew_changed', onBrewChanged);
}

module.exports = init;
