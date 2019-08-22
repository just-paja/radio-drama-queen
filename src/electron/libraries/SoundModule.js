class SoundModule {
  driver = null

  library = null

  modules = []

  name = null

  parent = null

  sounds = []

  url = null

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

module.exports = {
  SoundModule
}
