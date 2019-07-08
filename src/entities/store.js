import { createRoutine } from './actions'
import { Configurable } from './Configurable'
import { mergeArrays, createEntityReducer } from './reducers'

class EntityStore extends Configurable {
  constructor (name, config) {
    super(config)
    this.getAll = this.getAll.bind(this)
    this.getFirst = this.getFirst.bind(this)
    this.getFlag = this.getFlag.bind(this)
    this.getProp = this.getProp.bind(this)
    this.getSize = this.getSize.bind(this)
    this.isEmpty = this.isEmpty.bind(this)
    this.name = name
  }

  get identAttr () {
    return this.config.identAttr || 'uuid'
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

  getAll (state) {
    return state.entities[this.name]
  }

  getFirst (state, ident) {
    return this.getAll(state).find(item => item[this.identAttr] === ident) || null
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
