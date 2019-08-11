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

module.exports = {
  getDriver
}
