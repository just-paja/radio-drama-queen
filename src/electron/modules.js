const jetpack = require('fs-jetpack')
const path = require('path')

const { MANIFEST_FILE } = require('../soundModules/constants')
const { moduleIgnore, soundExtensions, RDQ_MANIFEST_FILE } = require('./constants')

function filterModuleDirectory (node) {
  return (
    node.type === 'dir' &&
    node.name.indexOf('.') !== 0 &&
    moduleIgnore.indexOf(node.name) === -1
  )
}

function isSound (name) {
  return soundExtensions.some(ext => name.endsWith(ext))
}

function formatLocalSound (parent, soundFile) {
  return {
    library: parent.library ? parent.library : parent.url,
    module: parent.library ? parent.url : null,
    name: soundFile,
    path: `file://${path.join(parent.directory, soundFile)}`
  }
}

function readLocalModuleChildren (module) {
  return jetpack.listAsync(module.directory)
    .then(nodes => Promise.all(nodes.map(node => jetpack.inspectAsync(jetpack.path(module.directory, node)))))
    .then(fileList => Promise.all(fileList
      .filter(filterModuleDirectory)
      .map(item => readLocalModule(module, {
        library: module.library || module.url,
        name: item.name,
        parent: module.library ? module.url : null
      }))
    ).then(modules => Object.assign({}, module, {
      modules,
      sounds: fileList
        .filter(item => item.type === 'file' && isSound(item.name))
        .map(item => formatLocalSound(module, item.name))
    })))
}

function readLocalModule (parent, module) {
  const directory = parent
    ? path.join(parent.directory, module.name)
    : module.directory
  const lib = Object.assign({}, module, {
    directory: directory,
    driver: module.driver || (parent && parent.driver),
    name: module.name || path.basename(directory),
    url: `file://${directory}`
  })
  const manifestPath = jetpack.path(lib.directory, RDQ_MANIFEST_FILE)
  return jetpack.readAsync(manifestPath, 'json')
    .then(manifest => manifest
      ? Object.assign({}, lib, manifest)
      : lib)
    .then(readLocalModuleChildren)
}

function getHttpDirName (remoteUrl) {
  if (remoteUrl.match(/\/$/)) {
    return remoteUrl
  }
  const url = new URL(remoteUrl)
  url.pathname = path.dirname(url.pathname)
  return url.pathname === '/'
    ? url.toString()
    : `${url.toString()}/`
}

function resolveModuleUrl (rootUrl, moduleName) {
  return `${rootUrl}/${moduleName}/${MANIFEST_FILE}`
}

function resolveSoundUrl (rootUrl, soundFile) {
  return `${rootUrl}/${soundFile}`
}

function formatRemoteModules (data) {
  if (!data.modules) {
    return []
  }

  const rootUrl = getHttpDirName(data.url)
  return data.modules.map(name => ({
    driver: data.driver,
    name,
    url: resolveModuleUrl(rootUrl, name)
  }))
}

function formatRemoteSounds (data) {
  if (!data.sounds) {
    return []
  }

  const rootUrl = getHttpDirName(data.url)
  return data.sounds.map(soundFile => ({
    name: soundFile,
    path: resolveSoundUrl(rootUrl, soundFile)
  }))
}

module.exports = {
  filterModuleDirectory,
  formatRemoteModules,
  formatRemoteSounds,
  getHttpDirName,
  isSound,
  readLocalModule,
  resolveModuleUrl
}
