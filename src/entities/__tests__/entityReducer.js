import { createEntityReducer, createRoutine } from '..'

describe('entity reducer', () => {
  function returnPayload (state, action) {
    return action.payload
  }

  it('returns previous state given action is not recognized', () => {
    const routine = createRoutine('TEST')
    const reducer = createEntityReducer({})
    const state = [
      { uuid: 'x3', name: 'foo' }
    ]
    expect(reducer(state, routine.success())).toBe(state)
  })

  it('returns empty array given action success is in clearedBy routines', () => {
    const routine = createRoutine('TEST')
    const reducer = createEntityReducer({
      ignoreAttrs: ['description'],
      clearedBy: [routine]
    })
    const state = [
      { uuid: 'x3', name: 'foo' }
    ]
    expect(reducer(state, routine.success())).toEqual([])
  })

  it('appends item to state given payload object item does not exist and filters attributes', () => {
    const routine = createRoutine('TEST')
    const reducer = createEntityReducer({
      ignoreAttrs: ['description'],
      providedBy: [routine]
    })
    const state = [
      { uuid: 'x3', name: 'foo' }
    ]
    expect(reducer(state, routine.success({
      description: 'xxx',
      name: 'bar',
      uuid: 'x9'
    }))).toEqual([
      { uuid: 'x3', name: 'foo' },
      { uuid: 'x9', name: 'bar' }
    ])
  })

  it('modifies item given payload object item exists and filters attributes', () => {
    const routine = createRoutine('TEST')
    const reducer = createEntityReducer({
      ignoreAttrs: ['description'],
      providedBy: [routine]
    })
    const state = [
      { uuid: 'x3', name: 'foo' },
      { uuid: 'x9', name: 'baz' }
    ]
    expect(reducer(state, routine.success({
      description: 'xxx',
      name: 'bar',
      uuid: 'x9'
    }))).toEqual([
      { uuid: 'x3', name: 'foo' },
      { uuid: 'x9', name: 'bar' }
    ])
  })

  it('deletes item given payload string item exists', () => {
    const routine = createRoutine('TEST')
    const reducer = createEntityReducer({
      ignoreAttrs: ['description'],
      deletedBy: [routine]
    })
    const state = [
      { uuid: 'x3', name: 'foo' },
      { uuid: 'x9', name: 'baz' }
    ]
    expect(reducer(state, routine.success('x9'))).toEqual([
      { uuid: 'x3', name: 'foo' }
    ])
  })

  it('modifies item given payload object item exists and filters attributes', () => {
    const routine = createRoutine('TEST')
    const reducer = createEntityReducer({
      ignoreAttrs: ['description'],
      on: {
        [routine.SUCCESS]: jest.fn().mockImplementation(returnPayload)
      }
    })
    const state = [
      { uuid: 'x3', name: 'foo', description: 'xxx' }
    ]
    expect(reducer(state, routine.success({ uuid: 'x3', name: 'bar' }))).toEqual([
      { uuid: 'x3', name: 'bar' }
    ])
  })

  it('modifies collection when it receives collection reducer action', () => {
    const routine = createRoutine('TEST')
    const reducer = createEntityReducer({
      collectionReducers: {
        [routine.SUCCESS]: jest.fn().mockImplementation(returnPayload)
      }
    })
    const state = [
      { uuid: 'x3', name: 'foo', description: 'xxx' }
    ]
    expect(reducer(state, routine.success([{ uuid: 'x1' }]))).toEqual([
      { uuid: 'x1' }
    ])
  })
})
