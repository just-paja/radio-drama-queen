import * as selectors from '..'

describe('sounds selectors', () => {
  it('countPlayingSounds returns amount of playing sounds', () => {
    const state = {
      entities: {
        sounds: [
          {
            cachePath: 'sound-1',
            playing: true
          },
          {
            cachePath: 'sound-2'
          },
          {
            cachePath: 'sound-3',
            playing: true
          }
        ]
      }
    }
    expect(selectors.countPlayingSounds(state)).toBe(2)
  })
})
