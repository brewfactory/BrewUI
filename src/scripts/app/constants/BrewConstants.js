var keyMirror = require('react/lib/keyMirror');

module.exports = {
  ActionTypes: keyMirror({
    READ_BREW: null,
    READ_BREW_SUCCESS: null,
    READ_BREW_FAILURE: null,

    RECEIVE_BREW: null,
    CREATE_BREW: null,
    PAUSE_BREW: null,
    STOP_BREW: null
  })
};
