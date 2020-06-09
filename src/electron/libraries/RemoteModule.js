const crypto = require('crypto')
const jetpack = require('fs-jetpack')
const path = require('path')

const { cacheFile } = require('../jsonCache')
const { DRIVER_REMOTE, MANIFEST_FILE } = require('./constants')
const { SoundModule } = require('./SoundModule')

class RemoteModule extends SoundModule {
  static readLibrary (config, payload) {
    return this.readModule(config, { url: payload.url })
  }

  static readModule (config, payload) {
    return new this(config, payload).readContents().then(mod => mod.toJson())
  }

  get baseName () {
    return this.getHttpDirName(this.url)
  }

  get libraryUrl () {
    return this.library || this.url
  }

  get cacheDir () {
    const modulePath = this.parent
      ? jetpack.path(
          ...this.url
            .split(this.libraryUrl)
            .join('')
            .split('/')
        )
      : ''
    const libraryDir = this.hashUrl(this.libraryUrl)
    return jetpack.path(this.config.paths.cache, libraryDir, modulePath)
  }

  getCachePath (fileName) {
    return jetpack.path(this.cacheDir, fileName)
  }

  hashUrl (dirName) {
    return crypto
      .createHash('md5')
      .update(dirName)
      .digest('hex')
  }

  async readContents () {
    await jetpack.dirAsync(this.cacheDir)
    const cachePath = this.getCachePath(MANIFEST_FILE)
    await cacheFile(cachePath, this.url)
    const manifest = await jetpack.readAsync(cachePath, 'json')
    await Promise.all([
      this.updateFromManifest(manifest),
      this.readModules(manifest),
      this.readSounds(manifest)
    ])
    return this
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
          library: this.libraryUrl,
          parent: this.url,
          url: this.resolveModuleUrl(this.baseName, name)
        }))
      : []
  }

  readSounds (data) {
    this.sounds = data.sounds
      ? data.sounds.map(soundFile => ({
          name: soundFile,
          libraryUrl: this.libraryUrl,
          module: this.name,
          path: this.resolveSoundUrl(this.baseName, soundFile)
        }))
      : []
  }
}

RemoteModule.prototype.driver = DRIVER_REMOTE

module.exports = {
  RemoteModule
}
