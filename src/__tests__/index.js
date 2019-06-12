describe('index file', () => {
  it('can be required without error', () => {
    expect(() => {
      const div = document.createElement('div')
      div.id = 'root'
      document.querySelector('body').appendChild(div)
      require('..')
    }).not.toThrow()
  })
})
