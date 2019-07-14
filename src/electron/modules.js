const path = require('path')

const { MANIFEST_FILE } = require('../soundModules/constants')

function formatLocalModule (parent, name) {
  return {
    directory: path.join(parent.directory, name),
    driver: parent.driver,
    name
  }
}

function formatLocalSound (parent, soundFile) {
  return {
    name: soundFile,
    path: `file://${path.join(parent.directory, soundFile)}`
  }
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
  formatLocalModule,
  formatLocalSound,
  formatRemoteModules,
  formatRemoteSounds,
  getHttpDirName,
  resolveModuleUrl
}
