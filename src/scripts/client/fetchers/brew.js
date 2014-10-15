var brewResource = require('../resources/brew');

/*
 * Create
 *
 * @method create
 * @param {Object} brew
 * @param {options} options
 * @callback
 */
exports.create = function (brew) {

  // Promise
  return brewResource.create({ brew: brew });
};
