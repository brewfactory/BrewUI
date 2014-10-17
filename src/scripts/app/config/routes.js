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
  designer: {
    name: 'Designer',
    path: '/designer',
    method: 'get',
    page: 'designer'
  },
  log: {
    name: 'Logs',
    path: '/log',
    method: 'get',
    page: 'log'
  }
};
