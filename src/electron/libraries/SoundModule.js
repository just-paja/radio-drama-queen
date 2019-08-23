class SoundModule {
  constructor ({
    library = null,
    name = null,
    parent = null,
    url
  }) {
    this.library = library
    this.name = name
    this.parent = parent
    this.url = url
    this.updateFromManifest = this.updateFromManifest.bind(this)
  }

  toJson () {
    return {
      driver: this.driver,
      library: this.library,
      modules: this.modules,
      name: this.name,
      parent: this.parent,
      sounds: this.sounds,
      url: this.url
    }
  }

  updateFromManifest (manifest) {
    if (manifest) {
      this.name = manifest.name
    }
  }
}

SoundModule.prototype.driver = null
SoundModule.prototype.library = null
SoundModule.prototype.modules = []
SoundModule.prototype.name = null
SoundModule.prototype.parent = null
SoundModule.prototype.sounds = []
SoundModule.prototype.url = null

module.exports = {
  SoundModule
}
