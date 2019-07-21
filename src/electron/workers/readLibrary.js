const jetpack = require('fs-jetpack')
const workerpool = require('workerpool')

const { cacheFile } = require('../jsonCache')
const { DRIVER_LOCAL, DRIVER_REMOTE } = require('../../soundLibraries/constants')
const { PATH_CACHE } = require('../paths')
const { readLocalModule, formatRemoteModules } = require('../modules')

function readRemoteLibrary (payload) {
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

function readLocalLibrary (payload) {
  return readLocalModule(null, payload)
}

workerpool.worker({
  readLibrary: (payload) => {
    if (payload.driver === DRIVER_REMOTE) {
      return readRemoteLibrary(payload)
    }
    if (payload.driver === DRIVER_LOCAL) {
      return readLocalLibrary(payload)
    }

    return Promise.reject(new Error('Unsupported library driver'))
  }
})
