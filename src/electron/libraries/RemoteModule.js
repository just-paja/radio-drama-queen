const jetpack = require('fs-jetpack')
const path = require('path')

const { cacheFile } = require('../jsonCache')
const { PATH_CACHE } = require('../paths')
const { DRIVER_REMOTE, MANIFEST_FILE } = require('./constants')
const { SoundModule } = require('./SoundModule')

class RemoteModule extends SoundModule {
  static readLibrary (payload) {
    return this.readModule({ url: payload.url })
  }

  static readModule (payload) {
    return (new this(payload)).readContents().then(mod => mod.toJson())
  }

  driver = DRIVER_REMOTE

  get baseName () {
    return this.getHttpDirName(this.url)
  }

  readContents () {
    return jetpack.dirAsync(PATH_CACHE)
      .then(() => cacheFile(this.url))
      .then(cachePath => jetpack.readAsync(cachePath, 'json'))
      .then(manifest => Promise.all([
        this.updateFromManifest(manifest),
        this.readModules(manifest),
        this.readSounds(manifest)
      ]))
      .then(() => this)
  }

  getHttpDirName (remoteUrl) {
    if (remoteUrl.match(/\/$/)) {
      return remoteUrl
    }
    const url = new URL(remoteUrl)
    url.pathname = path.dirname(url.pathname)
    return url.toString()
  }

  resolveModuleUrl (rootUrl, moduleName) {
    return `${rootUrl.replace(/\/$/, '')}/${moduleName}/${MANIFEST_FILE}`
  }

  resolveSoundUrl (rootUrl, soundFile) {
    return `${rootUrl}/${soundFile}`
  }

  readModules (manifest) {
    this.modules = manifest.modules
      ? manifest.modules.map(name => ({
        driver: this.driver,
        name,
        library: this.library || this.url,
        parent: this.url,
        url: this.resolveModuleUrl(this.baseName, name)
      }))
      : []
  }

  readSounds (data) {
    this.sounds = data.sounds
      ? data.sounds.map(soundFile => ({
        name: soundFile,
        path: this.resolveSoundUrl(this.baseName, soundFile)
      }))
      : []
  }
}

module.exports = {
  RemoteModule
}
