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

  append (attr, ...values) {
    this.config[attr] = [
      ...(this[attr] || []),
      ...values
    ]
  }

  extend (attr, config) {
    this.config[attr] = {
      ...(this[attr] || {}),
      ...config
    }
  }
}
