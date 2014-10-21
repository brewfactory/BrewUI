
var fetchers = {};

/*
 * Register
 *
 * @method register
 * @param {String}
 * @param {Object}
 */
function register(name, fetcher) {
  fetchers[name] = fetcher;
}


/*
 * Get
 *
 * @method register
 * @param {String}
 * @param {Object}
 */
function get(name) {
  if(!fetchers[name]) {
    throw new Error('Register the fetcher first: ' + name);
  }

  return fetchers[name];
}


// Public
exports.register = register;
exports.get = get;
