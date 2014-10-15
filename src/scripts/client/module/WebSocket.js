// Actions
var updateTemperature = require('./../../app/actions/brewer/updateTemperature');
var updatePWM = require('./../../app/actions/brewer/updatePWM');


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

    context.executeAction(updateTemperature, {
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

    context.executeAction(updatePWM, {
      pwm: roundedPWM
    });
  }


  // Events
  socket.on('temperature_changed', onTemperatureChanged);
  socket.on('pwm_changed', onPWMChanged);
}

module.exports = init;
