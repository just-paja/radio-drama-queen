import { createEntitiesReducer, createEntityStore, createRoutine } from '..'

describe('store manyToMany', () => {
  it('does not fail given target name is missing in parent payload', () => {
    const soundsRoutine = createRoutine('SOUNDS')
    const tagsRoutine = createRoutine('TAGS')
    const sounds = createEntityStore('sounds', {
      hasManyToMany: ['tags'],
      providedBy: [soundsRoutine]
    })
    const tags = createEntityStore('tags', {
      providedBy: [tagsRoutine]
    })
    const reducer = createEntitiesReducer(sounds, tags)
    const payload = [
      {
        uuid: '3',
        name: 'sound-1'
      }
    ]
    expect(() => reducer(undefined, soundsRoutine.success(payload))).not.toThrow()
  })

  it('does not fail given parent name is missing in target payload', () => {
    const soundsRoutine = createRoutine('SOUNDS')
    const tagsRoutine = createRoutine('TAGS')
    const sounds = createEntityStore('sounds', {
      hasManyToMany: ['tags'],
      providedBy: [soundsRoutine]
    })
    const tags = createEntityStore('tags', {
      providedBy: [tagsRoutine]
    })
    const reducer = createEntitiesReducer(sounds, tags)
    const payload = [
      {
        uuid: '7',
        name: 'bar'
      }
    ]
    expect(() => reducer(undefined, tagsRoutine.success(payload))).not.toThrow()
  })

  it('stores parent entities without manyToMany attribute from parent payload', () => {
    const soundsRoutine = createRoutine('SOUNDS')
    const tagsRoutine = createRoutine('TAGS')
    const sounds = createEntityStore('sounds', {
      hasManyToMany: ['tags'],
      providedBy: [soundsRoutine]
    })
    const tags = createEntityStore('tags', {
      providedBy: [tagsRoutine]
    })
    const reducer = createEntitiesReducer(sounds, tags)
    const payload = [
      {
        uuid: '3',
        name: 'sound-1',
        tags: [
          {
            uuid: '5',
            name: 'foo'
          }
        ]
      },
      {
        uuid: '4',
        name: 'sound-2',
        tags: [
          {
            uuid: '5',
            name: 'foo'
          },
          {
            uuid: '7',
            name: 'bar'
          }
        ]
      }
    ]
    expect(reducer(undefined, soundsRoutine.success(payload))).toHaveProperty('sounds', [
      { uuid: '3', name: 'sound-1', tags: ['5'] },
      { uuid: '4', name: 'sound-2', tags: ['5', '7'] }
    ])
  })

  it('creates relation target entities from parent payload', () => {
    const soundsRoutine = createRoutine('SOUNDS')
    const tagsRoutine = createRoutine('TAGS')
    const sounds = createEntityStore('sounds', {
      hasManyToMany: ['tags'],
      providedBy: [soundsRoutine]
    })
    const tags = createEntityStore('tags', {
      providedBy: [tagsRoutine]
    })
    const reducer = createEntitiesReducer(sounds, tags)
    const payload = [
      {
        uuid: '3',
        name: 'sound-1',
        tags: [
          {
            uuid: '5',
            name: 'foo'
          }
        ]
      },
      {
        uuid: '4',
        name: 'sound-2',
        tags: [
          {
            uuid: '5',
            name: 'foo'
          },
          {
            uuid: '7',
            name: 'bar'
          }
        ]
      }
    ]
    expect(reducer(undefined, soundsRoutine.success(payload))).toHaveProperty('tags', [
      {
        uuid: '5',
        name: 'foo',
        sounds: ['3', '4']
      },
      {
        uuid: '7',
        name: 'bar',
        sounds: ['4']
      }
    ])
  })

  it('creates relation parent entities from target payload', () => {
    const soundsRoutine = createRoutine('SOUNDS')
    const tagsRoutine = createRoutine('TAGS')
    const sounds = createEntityStore('sounds', {
      hasManyToMany: ['tags'],
      providedBy: [soundsRoutine]
    })
    const tags = createEntityStore('tags', {
      providedBy: [tagsRoutine]
    })
    const reducer = createEntitiesReducer(sounds, tags)
    const payload = [
      {
        uuid: '5',
        name: 'foo',
        sounds: [
          {
            uuid: '3',
            name: 'sound-1'
          }
        ]
      },
      {
        uuid: '7',
        name: 'bar',
        sounds: [
          {
            uuid: '3',
            name: 'sound-1'
          },
          {
            uuid: '4',
            name: 'sound-2'
          }
        ]
      }
    ]
    expect(reducer(undefined, tagsRoutine.success(payload))).toHaveProperty('sounds', [
      { uuid: '3', name: 'sound-1', tags: ['5', '7'] },
      { uuid: '4', name: 'sound-2', tags: ['7'] }
    ])
  })

  it('creates relation target entities from target payload', () => {
    const soundsRoutine = createRoutine('SOUNDS')
    const tagsRoutine = createRoutine('TAGS')
    const sounds = createEntityStore('sounds', {
      hasManyToMany: ['tags'],
      providedBy: [soundsRoutine]
    })
    const tags = createEntityStore('tags', {
      providedBy: [tagsRoutine]
    })
    const reducer = createEntitiesReducer(sounds, tags)
    const payload = [
      {
        uuid: '5',
        name: 'foo',
        sounds: [
          {
            uuid: '3',
            name: 'sound-1'
          }
        ]
      },
      {
        uuid: '7',
        name: 'bar',
        sounds: [
          {
            uuid: '3',
            name: 'sound-1'
          },
          {
            uuid: '4',
            name: 'sound-2'
          }
        ]
      }
    ]
    expect(reducer(undefined, tagsRoutine.success(payload))).toHaveProperty('tags', [
      { uuid: '5', name: 'foo', sounds: ['3'] },
      { uuid: '7', name: 'bar', sounds: ['3', '4'] }
    ])
  })

  it('getFirst returns item with mapped manyToMany relation from parent store', () => {
    const soundsRoutine = createRoutine('SOUNDS')
    const tagsRoutine = createRoutine('TAGS')
    const sounds = createEntityStore('sounds', {
      hasManyToMany: ['tags'],
      providedBy: [soundsRoutine]
    })
    const tags = createEntityStore('tags', {
      providedBy: [tagsRoutine]
    })
    createEntitiesReducer(sounds, tags)
    const state = {
      entities: {
        tags: [
          {
            uuid: '5',
            name: 'foo',
            sounds: ['3', '4']
          },
          {
            uuid: '7',
            name: 'bar',
            sounds: ['4']
          }
        ],
        sounds: [
          {
            uuid: '3',
            name: 'sound-1',
            tags: ['5']
          },
          {
            uuid: '4',
            name: 'sound-2',
            tags: ['5', '7']
          }
        ]
      }
    }
    expect(sounds.getFirst(state, '4')).toHaveProperty('tags', ['5', '7'])
  })

  it('getAll returns item with mapped manyToMany relation from parent store', () => {
    const soundsRoutine = createRoutine('SOUNDS')
    const tagsRoutine = createRoutine('TAGS')
    const sounds = createEntityStore('sounds', {
      hasManyToMany: ['tags'],
      providedBy: [soundsRoutine]
    })
    const tags = createEntityStore('tags', {
      providedBy: [tagsRoutine]
    })
    createEntitiesReducer(sounds, tags)
    const state = {
      entities: {
        tags: [
          {
            uuid: '5',
            name: 'foo',
            sounds: ['3', '4']
          },
          {
            uuid: '7',
            name: 'bar',
            sounds: ['4']
          }
        ],
        sounds: [
          {
            uuid: '3',
            name: 'sound-1',
            tags: ['5']
          },
          {
            uuid: '4',
            name: 'sound-2',
            tags: ['5', '7']
          }
        ]
      }
    }
    expect(sounds.getAll(state, '4')).toEqual([
      expect.objectContaining({
        uuid: '3',
        tags: ['5']
      }),
      expect.objectContaining({
        uuid: '4',
        tags: ['5', '7']
      })
    ])
  })

  it('processes large amount of data', () => {
    const soundsRoutine = createRoutine('SOUNDS')
    const tagsRoutine = createRoutine('TAGS')
    const sounds = createEntityStore('sounds', {
      hasManyToMany: ['tags'],
      providedBy: [soundsRoutine]
    })
    const tags = createEntityStore('tags', {
      providedBy: [tagsRoutine]
    })
    const reducer = createEntitiesReducer(sounds, tags)
    function getRandTags (amount) {
      const tags = []
      for (let i = 0; i < amount; i++) {
        const number = parseInt(Math.random() * 100 * i, 10)
        tags.push({
          uuid: number,
          title: number
        })
      }
      return tags
    }
    function getRandSounds (amount) {
      const sounds = []
      for (let i = 0; i < amount; i++) {
        sounds.push({
          uuid: i,
          name: i,
          tags: getRandTags(10)
        })
      }
      return sounds
    }
    const payload = getRandSounds(1000)
    const state = reducer(undefined, soundsRoutine.success(payload))
    sounds.getFirst({ entities: state }, 10)
  })
})
