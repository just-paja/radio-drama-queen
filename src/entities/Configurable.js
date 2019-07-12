export class Configurable {
  config = {}

  constructor (config = {}) {
    this.configure(config)
  }

  bind (attr) {
    this[attr] = this[attr].bind(this)
  }

  configure (config) {
    this.config = { ...this.config, ...config }
  }
}
