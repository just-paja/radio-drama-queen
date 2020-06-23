const { guessDriver } = require('../libraries')

function readLibrary (config, payload) {
  return guessDriver(payload).readLibrary(config, payload)
}

function readModule (config, payload) {
  return guessDriver(payload).readModule(config, payload)
}

module.exports = {
  readLibrary,
  readModule
}
