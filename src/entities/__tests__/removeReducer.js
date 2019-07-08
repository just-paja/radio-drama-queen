import { remove } from '..'

describe('remove reducer', () => {
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
    expect(remove(state, action, config)).toBe(state)
  })

  it('returns same state given payload string item does not exist', () => {
    const state = [
      { uuid: 'x3' }
    ]
    const action = {
      type: 'TEST',
      payload: 'x9'
    }
    const config = {
      identAttr: 'uuid'
    }
    expect(remove(state, action, config)).toBe(state)
  })

  it('returns same state given payload object item does not exist', () => {
    const state = [
      { uuid: 'x3' }
    ]
    const action = {
      type: 'TEST',
      payload: { uuid: 'x9' }
    }
    const config = {
      identAttr: 'uuid'
    }
    expect(remove(state, action, config)).toBe(state)
  })

  it('deletes item given payload string item exists', () => {
    const state = [
      { uuid: 'x3' },
      { uuid: 'x9' }
    ]
    const action = {
      type: 'TEST',
      payload: 'x9'
    }
    const config = {
      identAttr: 'uuid'
    }
    expect(remove(state, action, config)).toEqual([{ uuid: 'x3' }])
  })

  it('deletes item given payload object item exists', () => {
    const state = [
      { uuid: 'x3' },
      { uuid: 'x9' }
    ]
    const action = {
      type: 'TEST',
      payload: { uuid: 'x9' }
    }
    const config = {
      identAttr: 'uuid'
    }
    expect(remove(state, action, config)).toEqual([{ uuid: 'x3' }])
  })
})
