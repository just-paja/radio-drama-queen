import { Configurable } from './Configurable'
export class Relationship extends Configurable {
  get connection () {
    return `${this.parent.name}:${this.target.name}`
  }

  get name () {
    return `relationship(${this.connection})`
  }

  get parent () {
    return this.config.parent
  }

  get target () {
    return this.config.target
  }

  toString () {
    return this.name
  }
}
