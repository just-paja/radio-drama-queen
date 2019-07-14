const path = require('path')
const jetpack = require('fs-jetpack')
const workerpool = require('workerpool')

const { cacheFile } = require('../electron/jsonCache')
const { DRIVER_LOCAL, DRIVER_REMOTE } = require('../soundLibraries/constants')
const { formatLocalModule, formatRemoteModules } = require('../electron/modules')
const { PATH_CACHE } = require('../electron/paths')

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
  const name = path.basename(payload.directory)
  return jetpack.listAsync(payload.directory)
    .then(nodes => Promise.all(nodes.map(node => jetpack.inspectAsync(jetpack.path(payload.directory, node)))))
    .then(list => ({
      driver: payload.driver,
      directory: payload.directory,
      modules: list
        .filter(item => item.type === 'dir' && item.name.indexOf('.') !== 0)
        .map(item => formatLocalModule(payload, item.name)),
      name
    }))
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
