const path = require('path')

const { MANIFEST_FILE } = require('../soundModules/constants')

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

module.exports = {
  formatRemoteModules,
  getHttpDirName,
  resolveModuleUrl
}
