import * as selectors from '..'

describe('sounds selectors', () => {
  it('countPlayingSounds returns amount of playing sounds', () => {
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
})
