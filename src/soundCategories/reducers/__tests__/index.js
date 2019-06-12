import reducer from '..'

describe('combined reducer', () => {
  it('provides list reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('list')
  })
})
