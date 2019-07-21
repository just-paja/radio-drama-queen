const jetpack = require('fs-jetpack')
const workerpool = require('workerpool')

const { cacheFile } = require('../jsonCache')
const { DRIVER_LOCAL, DRIVER_REMOTE } = require('../../soundLibraries/constants')
const { PATH_CACHE } = require('../paths')
const {
  readLocalModule,
  formatRemoteModules,
  formatRemoteSounds
} = require('../modules')

function readRemoteModule (payload) {
  return jetpack.dirAsync(PATH_CACHE)
    .then(() => cacheFile(payload.url))
    .then(cachePath => jetpack.readAsync(cachePath, 'json'))
    .then(data => Object.assign({}, data, {
      library: payload.library,
      driver: payload.driver,
      url: payload.url
    }))
    .then(data => Object.assign({}, data, {
      modules: formatRemoteModules(data),
      sounds: formatRemoteSounds(data)
    }))
}

workerpool.worker({
  readModule: (payload) => {
    if (payload.driver === DRIVER_REMOTE) {
      return readRemoteModule(payload)
    }
    if (payload.driver === DRIVER_LOCAL) {
      return readLocalModule(null, payload)
    }

    return Promise.reject(new Error('Unsupported library driver'))
  }
})
