import reducer from '..'

describe('combined reducer', () => {
  it('provides form reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('form')
  })

  it('provides soundCategories reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('soundCategories')
  })

  it('provides soundModules reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('soundModules')
  })

  it('provides sounds reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('sounds')
  })

  it('provides soundTags reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('sounds')
  })
})
