const { getDriver } = require('../libraries')

function readLibrary (config, payload) {
  return getDriver(payload.driver).readLibrary(config, payload)
}

function readModule (config, payload) {
  return getDriver(payload.driver).readModule(config, payload)
}

module.exports = {
  readLibrary,
  readModule
}
