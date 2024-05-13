const { LOG_TYPES } = require('./constants');
const log = (type, location, message) => {
  console.log(type, location, message);
}

exports.init = (location) => ({
  logError: (message) => {
    log(LOG_TYPES.ERROR, location, message);
  },
  logMessage: (message) => {
    log(LOG_TYPES.MESSAGE, location, message);
  }
})
