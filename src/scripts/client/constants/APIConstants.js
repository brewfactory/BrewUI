var HOST = global.API_HOST || '';

module.exports = {
  Host: HOST+ '/api',
  WebSocket: HOST,
  Endpoints: {
    Brew: {
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
