import { stringSearch } from '../search'

describe('stringSearch', () => {
  it('resolves two word search as relevant', () => {
    expect(stringSearch('alien-spaceship', 'alien-spaceship'))
      .toBe(25)
  })

  it('resolves two different word search as relevant', () => {
    expect(stringSearch('alien-spaceship', 'alien spaceship'))
      .toBe(25)
  })
})
