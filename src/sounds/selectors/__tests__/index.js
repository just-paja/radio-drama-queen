import * as selectors from '..'

describe('sounds selectors', () => {
  it('getSoundPlayingStatus returns true when sound is playing', () => {
    const state = {
      entities: {
        sounds: [
          {
            uuid: 'foo',
            url: 'http://example.com/test',
            playing: true
          }
        ]
      }
    }
    expect(selectors.getSoundPlayingStatus(state, 'foo')).toEqual(true)
  })

  it('getSoundLoopStatus returns true when sound is playing', () => {
    const state = {
      entities: {
        sounds: [
          {
            uuid: 'foo',
            url: 'http://example.com/test',
            playing: true
          }
        ]
      }
    }
    expect(selectors.getSoundPlayingStatus(state, 'foo')).toEqual(true)
  })
})
