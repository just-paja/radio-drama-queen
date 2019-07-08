export class Configurable {
  config = {}

  constructor (config = {}) {
    this.configure(config)
  }

  configure (config) {
    this.config = { ...this.config, ...config }
  }
}
