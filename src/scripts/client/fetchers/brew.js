var brewResource = require('../resources/brew');

/*
 * Read
 *
 * @method read
 * @return {Promise}
 */
exports.read = function () {

  // Promise
  return brewResource.read();
};


/*
 * Create
 *
 * @method create
 * @param {Object} brew
 * @return {Promise}
 */
exports.create = function (brew) {

  // Promise
  return brewResource.create({ brew: brew });
};


/*
 * Stop
 *
 * @method stop
 * @return {Promise}
 */
exports.stop = function () {

  // Promise
  return brewResource.stop();
};


/*
 * Pause
 *
 * @method pause
 * @return {Promise}
 */
exports.pause = function () {

  // Promise
  return brewResource.pause();
};
