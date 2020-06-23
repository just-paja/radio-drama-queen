const jetpack = require('fs-jetpack')
const path = require('path')

const { SoundModule } = require('./SoundModule')
const {
  DRIVER_LOCAL,
  MANIFEST_FILE,
  moduleIgnore,
  soundExtensions
} = require('./constants')

class LocalModule extends SoundModule {
  static readLibrary (config, payload) {
    if (payload.url) {
      return this.readModule(config, payload)
    }
    return this.readModule(config, {
      url: `file://${payload.directory}`
    })
  }

  static readModule (config, payload) {
    return new this(config, payload).readContents().then(mod => mod.toJson())
  }

  constructor (config, props) {
    super(config, props)
    this.inspectFsNodes = this.inspectFsNodes.bind(this)
    this.readContents = this.readContents.bind(this)
    this.readFiles = this.readFiles.bind(this)
    this.readManifest = this.readManifest.bind(this)
    this.readModules = this.readModules.bind(this)
    this.readSounds = this.readSounds.bind(this)
  }

  get directory () {
    return this.url.substr(7)
  }

  filterModuleDirectory (node) {
    return (
      node &&
      node.type === 'dir' &&
      node.name.indexOf('.') !== 0 &&
      moduleIgnore.indexOf(node.name) === -1
    )
  }

  isSound (name) {
    return soundExtensions.some(ext => name.endsWith(ext))
  }

  readManifest () {
    this.name = path.basename(this.directory)
    const manifestPath = jetpack.path(this.directory, MANIFEST_FILE)
    return jetpack.readAsync(manifestPath, 'json').then(this.updateFromManifest)
  }

  inspectFsNodes (nodes) {
    if (!nodes) {
      return Promise.resolve([])
    }
    return Promise.all(
      nodes.map(node =>
        jetpack.inspectAsync(jetpack.path(this.directory, node))
      )
    )
  }

  readContents () {
    return Promise.all([this.readManifest(), this.readFiles()]).then(() => this)
  }

  readFiles () {
    return jetpack
      .listAsync(this.directory)
      .then(this.inspectFsNodes)
      .then(fileList => {
        this.readModules(fileList)
        this.readSounds(fileList)
        return this
      })
  }

  readModules (fileList) {
    this.modules = fileList.filter(this.filterModuleDirectory).map(item => ({
      driver: this.driver,
      library: this.library || this.url,
      parent: this.url,
      url: `file://${jetpack.path(this.directory, item.name)}`
    }))
  }

  readSounds (fileList) {
    this.sounds = fileList
      .filter(item => item && item.type === 'file' && this.isSound(item.name))
      .map(item => ({
        library: this.library ? this.library : this.url,
        module: this.url,
        name: item.name,
        path: `file://${jetpack.path(this.directory, item.name)}`
      }))
  }
}

LocalModule.prototype.driver = DRIVER_LOCAL

module.exports = {
  LocalModule
}
