module.exports = {
  Host: 'http://localhost:9003/api',
  Endpoints: {
    Brew: {
      create: '/brew',
      stop: '/brew/stop',
      pause: '/brew/pause'
    },
    Log: {
      find: '/brew/log',
      findOne: '/brew/log/'
    }
  }
};
