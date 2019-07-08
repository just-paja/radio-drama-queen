import { createEntityStore, createRoutine } from '..'

describe('entityStore', () => {
  it('provides clear routine', () => {
    const store = createEntityStore('users')
    store.initialize()
    expect(store).toHaveProperty('clear')
  })

  it('provides collection name', () => {
    const store = createEntityStore('users')
    expect(store).toHaveProperty('name', 'users')
  })

  it('provides uuid as default identAttr', () => {
    const store = createEntityStore('users')
    expect(store).toHaveProperty('identAttr', 'uuid')
  })

  it('provides custom identAttr', () => {
    const store = createEntityStore('users', {
      identAttr: 'name'
    })
    expect(store).toHaveProperty('config.identAttr', 'name')
  })

  it('provides providedBy routines', () => {
    const routine = createRoutine('TEST')
    const store = createEntityStore('users', {
      providedBy: [routine]
    })
    expect(store).toHaveProperty('config.providedBy', [routine])
  })

  it('provides deletedBy routines', () => {
    const routine = createRoutine('TEST')
    const store = createEntityStore('users', {
      deletedBy: [routine]
    })
    expect(store).toHaveProperty('config.deletedBy', [routine])
  })

  it('provides collectionReducers', () => {
    const routine = createRoutine('TEST')
    const reducer = state => state
    const store = createEntityStore('users', {
      collectionReducers: {
        [routine.SUCCESS]: reducer
      }
    })
    expect(store).toHaveProperty('config.collectionReducers', {
      [routine.SUCCESS]: reducer
    })
  })

  it('provides on reducers', () => {
    const routine = createRoutine('TEST')
    const reducer = state => state
    const store = createEntityStore('users', {
      on: {
        [routine.SUCCESS]: reducer
      }
    })
    expect(store).toHaveProperty('config.on', {
      [routine.SUCCESS]: reducer
    })
  })

  it('getAll selector returns all entities', () => {
    const store = createEntityStore('users')
    const state = {
      entities: {
        users: [
          { uuid: '1' },
          { uuid: '2' }
        ]
      }
    }
    expect(store.getAll(state)).toEqual([
      { uuid: '1' },
      { uuid: '2' }
    ])
  })

  it('getFirst selector returns entity matching identAttr given it exists', () => {
    const store = createEntityStore('users')
    const state = {
      entities: {
        users: [
          { uuid: '1', name: 'foo' },
          { uuid: '2', name: 'bar' }
        ]
      }
    }
    expect(store.getFirst(state, '2')).toEqual({ uuid: '2', name: 'bar' })
  })

  it('getFirst selector returns null given entity matching identAttr does not exist', () => {
    const store = createEntityStore('users')
    const state = {
      entities: {
        users: [
          { uuid: '1', name: 'foo' },
          { uuid: '2', name: 'bar' }
        ]
      }
    }
    expect(store.getFirst(state, '3')).toEqual(null)
  })

  it('getFlag selector returns true given entity matching identAttr exists and is truthy', () => {
    const store = createEntityStore('users')
    const state = {
      entities: {
        users: [
          { uuid: '1', name: 'foo', active: false },
          { uuid: '2', name: 'bar', active: true }
        ]
      }
    }
    expect(store.getFlag(state, '2', 'active')).toBe(true)
  })

  it('getFlag selector returns false given entity matching identAttr exists and is falsy', () => {
    const store = createEntityStore('users')
    const state = {
      entities: {
        users: [
          { uuid: '1', name: 'foo', active: false },
          { uuid: '2', name: 'bar', active: false }
        ]
      }
    }
    expect(store.getFlag(state, '2', 'active')).toBe(false)
  })

  it('getFlag selector returns false given entity matching identAttr does not exist', () => {
    const store = createEntityStore('users')
    const state = {
      entities: {
        users: [
          { uuid: '1', name: 'foo', active: false },
          { uuid: '2', name: 'bar', active: true }
        ]
      }
    }
    expect(store.getFlag(state, '3', 'active')).toBe(false)
  })

  it('getProp selector returns prop value given entity matching identAttr exists', () => {
    const store = createEntityStore('users')
    const state = {
      entities: {
        users: [
          { uuid: '1', name: 'foo', active: false },
          { uuid: '2', name: 'bar', active: true }
        ]
      }
    }
    expect(store.getProp(state, '2', 'name')).toBe('bar')
  })

  it('getProp selector returns null given entity matching identAttr does not exist', () => {
    const store = createEntityStore('users')
    const state = {
      entities: {
        users: [
          { uuid: '1', name: 'foo', active: false },
          { uuid: '2', name: 'bar', active: true }
        ]
      }
    }
    expect(store.getProp(state, '3', 'name')).toBe(null)
  })

  it('getSize selector returns entity count', () => {
    const store = createEntityStore('users')
    const state = {
      entities: {
        users: [
          { uuid: '1', name: 'foo', active: false },
          { uuid: '2', name: 'bar', active: true }
        ]
      }
    }
    expect(store.getSize(state)).toBe(2)
  })

  it('isEmpty selector returns true given entity count is zero', () => {
    const store = createEntityStore('users')
    const state = {
      entities: {
        users: []
      }
    }
    expect(store.isEmpty(state)).toBe(true)
  })

  it('isEmpty selector returns false given entity count one', () => {
    const store = createEntityStore('users')
    const state = {
      entities: {
        users: [
          { uuid: '1', name: 'foo', active: false },
          { uuid: '2', name: 'bar', active: true }
        ]
      }
    }
    expect(store.isEmpty(state)).toBe(false)
  })
})
