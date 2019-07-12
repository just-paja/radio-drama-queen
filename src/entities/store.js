import { createRoutine } from './actions'
import { Configurable } from './Configurable'
import { mergeArrays, createEntityReducer } from './reducers'

class EntityStore extends Configurable {
  constructor (name, config) {
    super({ ...config, name })
    this.bind('getAll')
    this.bind('getFirst')
    this.bind('getFlag')
    this.bind('getProp')
    this.bind('getSize')
    this.bind('isEmpty')
    this.bind('mapItemAttrs')
    this.name = name
  }

  get identAttr () {
    return this.config.identAttr || 'uuid'
  }

  get attrSelectors () {
    return this.config.attrSelectors
  }

  initialize () {
    this.createActions()
    this.createReducer()
  }

  createActions () {
    this.clear = createRoutine(`${this.name.toUpperCase()}/CLEAR`)
    this.configure({ clearedBy: mergeArrays([this.clear], this.config.clearedBy) })
  }

  createReducer () {
    this.reducer = createEntityReducer(this.config)
  }

  mapItemAttrs (state, item) {
    if (!this.attrSelectors) {
      return item
    }
    return this.attrSelectors.reduce((acc, selector) => selector(acc, item), state)
  }

  getCollection (state) {
    return state.entities[this.name]
  }

  getAll (state) {
    return this.getCollection(state).map((item) => this.mapItemAttrs(state, item))
  }

  getFirst (state, ident) {
    const item = this.getCollection(state).find(item => item[this.identAttr] === ident)
    return item
      ? this.mapItemAttrs(state, item)
      : null
  }

  getProp (state, ident, prop) {
    const item = this.getFirst(state, ident)
    return item ? item[prop] : null
  }

  getFlag (state, ident, prop) {
    return Boolean(this.getProp(state, ident, prop))
  }

  getSize (state) {
    return this.getAll(state).length
  }

  isEmpty (state) {
    return this.getSize(state) === 0
  }

  toString () {
    return `EntityStore(${this.name})`
  }
}

export function createEntityStore (collectionName, config) {
  return new EntityStore(collectionName, config)
}
