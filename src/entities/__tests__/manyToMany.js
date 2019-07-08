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
      { uuid: '3', name: 'sound-1' },
      { uuid: '4', name: 'sound-2' }
    ])
  })

  it('creates relation table entities from parent payload', () => {
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
    expect(reducer(undefined, soundsRoutine.success(payload))).toHaveProperty('manyToMany(sounds:tags)', [
      expect.objectContaining({ sounds: '3', tags: '5' }),
      expect.objectContaining({ sounds: '4', tags: '5' }),
      expect.objectContaining({ sounds: '4', tags: '7' })
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
      { uuid: '5', name: 'foo' },
      { uuid: '7', name: 'bar' }
    ])
  })

  it('stores parent entities without manyToMany attribute from target payload', () => {
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
      { uuid: '3', name: 'sound-1' },
      { uuid: '4', name: 'sound-2' }
    ])
  })

  it('creates relation table entities from target payload', () => {
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
          },
          {
            uuid: '4',
            name: 'sound-2'
          }
        ]
      },
      {
        uuid: '7',
        name: 'bar',
        sounds: [
          {
            uuid: '4',
            name: 'sound-2'
          }
        ]
      }
    ]
    expect(reducer(undefined, tagsRoutine.success(payload))).toHaveProperty('manyToMany(sounds:tags)', [
      expect.objectContaining({ sounds: '3', tags: '5' }),
      expect.objectContaining({ sounds: '4', tags: '5' }),
      expect.objectContaining({ sounds: '4', tags: '7' })
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
      { uuid: '5', name: 'foo' },
      { uuid: '7', name: 'bar' }
    ])
  })
})
