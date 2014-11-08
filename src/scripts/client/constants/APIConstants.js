
// Overwrite host from window/global or from localStorage
var localStorageHost = global.localStorage && global.localStorage.API_HOST;
var HOST = global.API_HOST || localStorageHost || '';

module.exports = {
  Host: HOST+ '/api',
  WebSocket: HOST,
  Endpoints: {
    Brew: {
      read: '/brew',
      create: '/brew',
      stop: '/brew/stop',
      pause: '/brew/pause'
    },
    Log: {
      find: '/brew/log',
      findOne: '/brew/log/:id'
    }
  }
};
