var logResource = require('../resources/log');

/*
 * Find
 *
 * @method find
 */
exports.find = function () {

  // Promise
  return logResource.find();
};


/*
 * Find one
 *
 * @method findOne
 * @param {Object} options
 */
exports.findOne = function (options) {

  // Promise
  return logResource.findOne(options);
};
