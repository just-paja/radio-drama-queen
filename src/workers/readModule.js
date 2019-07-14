const path = require('path')
const jetpack = require('fs-jetpack')
const workerpool = require('workerpool')

const { cacheFile } = require('../electron/jsonCache')
const { DRIVER_LOCAL, DRIVER_REMOTE } = require('../soundLibraries/constants')
const { PATH_CACHE } = require('../electron/paths')
const {
  formatLocalModule,
  formatLocalSound,
  formatRemoteModules,
  formatRemoteSounds
} = require('../electron/modules')

function readRemoteModule (payload) {
  return jetpack.dirAsync(PATH_CACHE)
    .then(() => cacheFile(payload.url))
    .then(cachePath => jetpack.readAsync(cachePath, 'json'))
    .then(data => Object.assign({}, data, {
      driver: payload.driver,
      url: payload.url
    }))
    .then(data => Object.assign({}, data, {
      modules: formatRemoteModules(data),
      sounds: formatRemoteSounds(data)
    }))
}

function isSound (name) {
  return name.indexOf('.mp3') !== -1
}

function readLocalModule (payload) {
  const name = path.basename(payload.directory)
  return jetpack.listAsync(payload.directory)
    .then(nodes => Promise.all(nodes.map(node => jetpack.inspectAsync(jetpack.path(payload.directory, node)))))
    .then(list => ({
      driver: payload.driver,
      directory: payload.directory,
      modules: list
        .filter(item => item.type === 'dir' && item.name.indexOf('.') !== 0)
        .map(item => formatLocalModule(payload, item.name)),
      name,
      sounds: list
        .filter(item => item.type === 'file' && isSound(item.name))
        .map(item => formatLocalSound(payload, item.name))
    }))
}

workerpool.worker({
  readModule: (payload) => {
    if (payload.driver === DRIVER_REMOTE) {
      return readRemoteModule(payload)
    }
    if (payload.driver === DRIVER_LOCAL) {
      return readLocalModule(payload)
    }

    return Promise.reject(new Error('Unsupported library driver'))
  }
})
