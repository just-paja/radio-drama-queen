import { getFilteredSounds } from '..'

describe('soundSearch selectors', () => {
  function mockFilterValue (filter) {
    return { soundAdd: { values: { filter } } }
  }

  it('getFilteredSounds skips already used in a category', () => {
    const state = {
      form: mockFilterValue('horse'),
      entities: {
        categories: [
          {
            uuid: 'category-1',
            sounds: ['sound-1']
          }
        ],
        tags: [],
        sounds: [
          {
            uuid: 'sound-1',
            name: 'Horse snort',
            tags: []
          },
          {
            uuid: 'sound-2',
            name: 'Dog bark',
            tags: []
          }
        ]
      }
    }
    expect(getFilteredSounds(state)).toEqual([])
  })

  it('getFilteredSounds skips sounds not matching one word search', () => {
    const state = {
      form: mockFilterValue('cat'),
      entities: {
        categories: [],
        tags: [],
        sounds: [
          {
            uuid: 'sound-1',
            name: 'Horse snort',
            tags: []
          },
          {
            uuid: 'sound-2',
            name: 'Dog bark',
            tags: []
          }
        ]
      }
    }
    expect(getFilteredSounds(state)).toEqual([])
  })

  it('getFilteredSounds skips sounds not matching two word search', () => {
    const state = {
      form: mockFilterValue('cat meow'),
      entities: {
        categories: [],
        tags: [],
        sounds: [
          {
            uuid: 'sound-1',
            name: 'Horse snort',
            tags: []
          },
          {
            uuid: 'sound-2',
            name: 'Dog bark',
            tags: []
          }
        ]
      }
    }
    expect(getFilteredSounds(state)).toEqual([])
  })

  it('getFilteredSounds returns sound matching one word search', () => {
    const state = {
      form: mockFilterValue('horse'),
      entities: {
        categories: [],
        tags: [],
        sounds: [
          {
            uuid: 'sound-1',
            name: 'Horse snort',
            tags: []
          },
          {
            uuid: 'sound-2',
            name: 'Dog bark',
            tags: []
          }
        ]
      }
    }
    expect(getFilteredSounds(state)).toContainEqual(expect.objectContaining({
      name: 'Horse snort'
    }))
  })

  it('getFilteredSounds returns sound matching two word search', () => {
    const state = {
      form: mockFilterValue('horse ort'),
      entities: {
        categories: [],
        tags: [],
        sounds: [
          {
            uuid: 'sound-1',
            name: 'Horse snort',
            tags: []
          },
          {
            uuid: 'sound-2',
            name: 'Dog bark',
            tags: []
          }
        ]
      }
    }
    expect(getFilteredSounds(state)).toContainEqual(expect.objectContaining({
      name: 'Horse snort'
    }))
  })

  it('getFilteredSounds returns matching sounds sorted by name relevance to one word search', () => {
    const state = {
      form: mockFilterValue('eng'),
      entities: {
        categories: [],
        tags: [],
        sounds: [
          {
            uuid: 'sound-1',
            name: 'Breakdown of an engine',
            tags: []
          },
          {
            uuid: 'sound-2',
            name: 'Car engine startup',
            tags: []
          }
        ]
      }
    }
    expect(getFilteredSounds(state)).toEqual([
      expect.objectContaining({
        name: 'Car engine startup'
      }),
      expect.objectContaining({
        name: 'Breakdown of an engine'
      })
    ])
  })

  it('getFilteredSounds returns matching sounds sorted by name relevance to two word search', () => {
    const state = {
      form: mockFilterValue('car eng'),
      entities: {
        categories: [],
        tags: [],
        sounds: [
          {
            uuid: 'sound-1',
            name: 'Breakdown of a car engine',
            tags: []
          },
          {
            uuid: 'sound-2',
            name: 'Car engine startup',
            tags: []
          }
        ]
      }
    }
    expect(getFilteredSounds(state)).toEqual([
      expect.objectContaining({
        name: 'Car engine startup'
      }),
      expect.objectContaining({
        name: 'Breakdown of a car engine'
      })
    ])
  })

  it('getFilteredSounds returns sound with tag matching one word search', () => {
    const state = {
      form: mockFilterValue('startup'),
      entities: {
        categories: [],
        tags: [
          {
            name: 'eng-car',
            title: 'Car'
          },
          {
            name: 'eng-startup',
            title: 'Startup'
          },
          {
            name: 'eng-breakdown',
            title: 'Breakdown'
          }
        ],
        sounds: [
          {
            uuid: 'sound-1',
            name: 'Engine breakdown',
            tags: ['eng-car', 'eng-breakdown']
          },
          {
            uuid: 'sound-2',
            name: 'Engine startup',
            tags: ['eng-car', 'eng-startup']
          }
        ]
      }
    }
    expect(getFilteredSounds(state)).toEqual([
      expect.objectContaining({
        name: 'Engine startup'
      })
    ])
  })

  it('getFilteredSounds returns sound with tags matching two word search', () => {
    const state = {
      form: mockFilterValue('passenger startup'),
      entities: {
        categories: [],
        tags: [
          {
            name: 'eng-car',
            title: 'Car'
          },
          {
            name: 'eng-passenger-car',
            title: 'Passenger car'
          },
          {
            name: 'eng-startup',
            title: 'Startup'
          },
          {
            name: 'eng-breakdown',
            title: 'Breakdown'
          }
        ],
        sounds: [
          {
            uuid: 'sound-1',
            name: 'Engine breakdown',
            tags: ['eng-car', 'eng-breakdown']
          },
          {
            uuid: 'sound-2',
            name: 'Engine startup',
            tags: ['eng-car', 'eng-startup', 'eng-passenger-car']
          }
        ]
      }
    }
    expect(getFilteredSounds(state)).toEqual([
      expect.objectContaining({
        name: 'Engine startup'
      })
    ])
  })

  it('getFilteredSounds returns sound with name and tags matching two word search', () => {
    const state = {
      form: mockFilterValue('car startup'),
      entities: {
        categories: [],
        tags: [
          {
            name: 'eng-car',
            title: 'Car'
          },
          {
            name: 'eng-passenger-car',
            title: 'Passenger car'
          },
          {
            name: 'eng-startup',
            title: 'Startup'
          },
          {
            name: 'eng-breakdown',
            title: 'Breakdown'
          }
        ],
        sounds: [
          {
            uuid: 'sound-1',
            name: 'Engine breakdown',
            tags: ['eng-car', 'eng-breakdown']
          },
          {
            uuid: 'sound-2',
            name: 'Engine startup',
            tags: ['eng-car', 'eng-startup', 'eng-passenge-car']
          }
        ]
      }
    }
    expect(getFilteredSounds(state)).toEqual([
      expect.objectContaining({
        name: 'Engine startup'
      })
    ])
  })
})
