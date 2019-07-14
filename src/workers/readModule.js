const jetpack = require('fs-jetpack')
const workerpool = require('workerpool')

const { cacheFile } = require('../electron/jsonCache')
const { DRIVER_REMOTE } = require('../soundLibraries/constants')
const { formatRemoteModules } = require('../electron/modules')
const { PATH_CACHE } = require('../electron/paths')

function readRemoteModule (payload) {
  return jetpack.dirAsync(PATH_CACHE)
    .then(() => cacheFile(payload.url))
    .then(cachePath => jetpack.readAsync(cachePath, 'json'))
    .then(data => Object.assign({}, data, {
      driver: payload.driver,
      url: payload.url
    }))
    .then(data => Object.assign({}, data, {
      modules: formatRemoteModules(data)
    }))
}

workerpool.worker({
  readModule: (payload) => {
    if (payload.driver === DRIVER_REMOTE) {
      return readRemoteModule(payload)
    }

    return Promise.reject(new Error('Unsupported library driver'))
  }
})
