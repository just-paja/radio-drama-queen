import reducer from '..'

describe('combined reducer', () => {
  it('provides form reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('form')
  })

  it('provides entities reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('entities')
  })

  it('provides soundGallery reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('soundGallery')
  })

  it('provides soundWorkspaces reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('soundWorkspaces')
  })
})
