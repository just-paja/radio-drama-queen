const workerpool = require('workerpool')

const { getDriver } = require('../libraries')

workerpool.worker({
  readLibrary: payload => getDriver(payload.driver).readLibrary(payload)
})
