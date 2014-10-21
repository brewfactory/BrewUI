module.exports = {
  Endpoints: {
    Brew: {
      create: 'http://localhost:9003/api/brew',
      stop: 'http://localhost:9003/api/brew/stop',
      pause: 'http://localhost:9003/api/brew/pause'
    },
    Log: {
      find: 'http://localhost:9003/api/brew/log',
      findOne: 'http://localhost:9003/api/brew/log/'
    }
  }
};
