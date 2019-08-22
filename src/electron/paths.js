const electron = require('electron')
const jetpack = require('fs-jetpack')

const isLocalPath = path => path.indexOf('file:') === 0

const removeLocalProtocol = path => path.substr(7)

const splitNameFromExtension = (url) => {
  const fileParts = url.split('/')
  const fileName = fileParts[fileParts.length - 1]
  const fileNameParts = fileName.split('.')
  return {
    name: fileNameParts.join('.'),
    extension: fileNameParts.length > 1 ? fileNameParts.pop() : null
  }
}

const PATH_FALLBACK_ROOT = jetpack.path(__dirname, '..', '..')

const getPath = (...args) => {
  return jetpack.path(process.env.HOME, '.config', 'radio-drama-queen', ...args)
}

const getAppPath = (...args) => {
  if (electron && electron.app) {
    return electron.app.getAppPath(...args)
  }
  return PATH_FALLBACK_ROOT
}

const PATH_CACHE = getPath('Cache')
const PATH_EXE = getAppPath('exe')
const PATH_STORIES = getPath('Stories')
const PATH_ELECTRON = jetpack.path(PATH_EXE, 'src', 'electron')
const PATH_WORKERS = jetpack.path(PATH_ELECTRON, 'workers')

module.exports = {
  getAppPath,
  getPath,
  isLocalPath,
  PATH_CACHE,
  PATH_EXE,
  PATH_FALLBACK_ROOT,
  PATH_STORIES,
  PATH_ELECTRON,
  PATH_WORKERS,
  removeLocalProtocol,
  splitNameFromExtension
}
