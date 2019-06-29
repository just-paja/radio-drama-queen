import * as selectors from '..'

describe('soundWorkspaces stats selectors', () => {
  it('countBoardSounds returns amount of sounds located on any board', () => {
    const state = {
      entities: {
        categories: [
          {
            uuid: 'category-1',
            board: 'board-1',
            sounds: ['sound-1', 'sound-2']
          },
          {
            uuid: 'category-2',
            board: 'board-2',
            sounds: ['sound-2']
          }
        ],
        boards: [
          {
            uuid: 'board-1'
          },
          {
            uuid: 'board-2'
          }
        ],
        sounds: [
          {
            uuid: 'sound-1'
          },
          {
            uuid: 'sound-2'
          },
          {
            uuid: 'sound-3'
          }
        ]
      }
    }
    expect(selectors.countBoardSounds(state)).toBe(2)
  })

  it('countMemorySounds returns amount of valid sounds', () => {
    const state = {
      entities: {
        sounds: [
          {
            uuid: 'sound-1',
            valid: true
          },
          {
            uuid: 'sound-2'
          },
          {
            uuid: 'sound-3',
            valid: true
          }
        ]
      }
    }
    expect(selectors.countMemorySounds(state)).toBe(2)
  })

  it('countErrorSounds returns amount of errored sounds', () => {
    const state = {
      entities: {
        sounds: [
          {
            uuid: 'sound-1',
            error: new Error('Test!')
          },
          {
            uuid: 'sound-2'
          },
          {
            uuid: 'sound-3',
            error: new Error('Test!')
          }
        ]
      }
    }
    expect(selectors.countErrorSounds(state)).toBe(2)
  })

  it('countPlayingSounds returns amount of errored sounds', () => {
    const state = {
      entities: {
        sounds: [
          {
            uuid: 'sound-1',
            playing: true
          },
          {
            uuid: 'sound-2'
          },
          {
            uuid: 'sound-3',
            playing: true
          }
        ]
      }
    }
    expect(selectors.countPlayingSounds(state)).toBe(2)
  })

  it('countTags returns sound tag amount', () => {
    const state = {
      entities: {
        tags: [
          {
            name: 'tag-1'
          },
          {
            name: 'tag-2'
          },
          {
            name: 'tag-3'
          }
        ]
      }
    }
    expect(selectors.countTags(state)).toBe(3)
  })
})
