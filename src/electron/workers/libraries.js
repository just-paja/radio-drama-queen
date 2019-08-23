const { getDriver } = require('../libraries')

function readLibrary (payload) {
  return getDriver(payload.driver).readLibrary(payload)
}

function readModule (payload) {
  return getDriver(payload.driver).readModule(payload)
}

module.exports = {
  readLibrary,
  readModule
}
