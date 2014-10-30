module.exports = {
  Host: 'http://localhost:9003/api',
  WebSocket: 'http://localhost:9003',
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
