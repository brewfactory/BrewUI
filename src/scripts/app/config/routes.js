/*
 * Routes
 *
 * @module Routes
 */

module.exports = {
  dashboard: {
    name: 'Dashboard',
    path: '/',
    method: 'get',
    page: 'dashboard'
  },
  log: {
    name: 'Logs',
    path: '/log',
    method: 'get',
    page: 'log'
  }
};
