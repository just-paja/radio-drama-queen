const workerpool = require('workerpool')

const { getDriver } = require('../libraries')

workerpool.worker({
  readModule: payload => getDriver(payload.driver).readModule(payload)
})
