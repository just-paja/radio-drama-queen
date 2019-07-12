import { upsert } from '..'

describe('upsert reducer', () => {
  it('returns same state given payload has no ident', () => {
    const state = [
      { uuid: 'x3' }
    ]
    const action = {
      type: 'TEST',
      payload: {}
    }
    const config = {
      identAttr: 'uuid'
    }
    expect(upsert(state, action, config)).toBe(state)
  })

  it('appends item to state given payload object item does not exist', () => {
    const state = [
      { uuid: 'x3', name: 'foo' }
    ]
    const action = {
      type: 'TEST',
      payload: {
        name: 'bar',
        uuid: 'x9'
      }
    }
    const config = {
      identAttr: 'uuid'
    }
    expect(upsert(state, action, config)).toEqual([
      { uuid: 'x3', name: 'foo' },
      { uuid: 'x9', name: 'bar' }
    ])
  })

  it('modifies item given payload object item exists', () => {
    const state = [
      { uuid: 'x3', name: 'foo' }
    ]
    const action = {
      type: 'TEST',
      payload: {
        name: 'bar',
        uuid: 'x3'
      }
    }
    const config = {
      identAttr: 'uuid'
    }
    expect(upsert(state, action, config)).toEqual([
      { uuid: 'x3', name: 'bar' }
    ])
  })

  it('appends all items to state when called with array of payload objects', () => {
    const state = [
      { uuid: 'x3', name: 'foo' }
    ]
    const action = {
      type: 'TEST',
      payload: [
        { name: 'bar', uuid: 'x9' },
        { name: 'baz', uuid: 'x7' }
      ]
    }
    const config = {
      identAttr: 'uuid'
    }
    expect(upsert(state, action, config)).toEqual([
      { uuid: 'x3', name: 'foo' },
      { uuid: 'x9', name: 'bar' },
      { uuid: 'x7', name: 'baz' }
    ])
  })

  it('modifies all items when called with array of payload objects', () => {
    const state = [
      { uuid: 'x3', name: 'foo' }
    ]
    const action = {
      type: 'TEST',
      payload: [
        { uuid: 'x3', name: 'bar' },
        { uuid: 'x9', name: 'bar' }
      ]
    }
    const config = {
      identAttr: 'uuid'
    }
    expect(upsert(state, action, config)).toEqual([
      { uuid: 'x3', name: 'bar' },
      { uuid: 'x9', name: 'bar' }
    ])
  })
})
