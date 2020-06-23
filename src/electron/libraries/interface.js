const { DRIVER_LOCAL, DRIVER_REMOTE } = require('./constants')
const { LocalModule } = require('./LocalModule')
const { RemoteModule } = require('./RemoteModule')

function getDriver (driver) {
  if (driver === DRIVER_REMOTE) {
    return RemoteModule
  }
  if (driver === DRIVER_LOCAL) {
    return LocalModule
  }
  throw new Error(`Unsupported driver: ${driver}`)
}

function guessDriver (soundModule) {
  if (!soundModule.driver) {
    // Assume that we have only sound module URI
    if (soundModule.url.indexOf('file://') === 0) {
      return getDriver(DRIVER_LOCAL)
    }
    return getDriver(DRIVER_REMOTE)
  }
  return getDriver(soundModule.driver)
}

module.exports = {
  getDriver,
  guessDriver
}
