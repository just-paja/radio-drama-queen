import * as selectors from '..';

describe('sounds selectors', () => {
  it('memoizeSoundList returns sound list', () => {
    const state = {
      sounds: {
        list: [
          {
            uuid: 'foo',
          },
        ],
      },
    };
    expect(selectors.memoizeSoundList(state)).toEqual([
      {
        uuid: 'foo',
      },
    ]);
  });

  it('getSound returns sound by uuid', () => {
    const state = {
      sounds: {
        list: [
          {
            uuid: 'foo',
            url: 'http://example.com/test',
          },
        ],
      },
    };
    expect(selectors.getSound(state, 'foo')).toEqual({
      uuid: 'foo',
      url: 'http://example.com/test',
    });
  });

  it('getSoundPlayingStatus returns true when sound is playing', () => {
    const state = {
      sounds: {
        list: [
          {
            uuid: 'foo',
            url: 'http://example.com/test',
            playing: true,
          },
        ],
      },
    };
    expect(selectors.getSoundPlayingStatus(state, 'foo')).toEqual(true);
  });

  it('getSoundLoopStatus returns true when sound is playing', () => {
    const state = {
      sounds: {
        list: [
          {
            uuid: 'foo',
            url: 'http://example.com/test',
            playing: true,
          },
        ],
      },
    };
    expect(selectors.getSoundPlayingStatus(state, 'foo')).toEqual(true);
  });
});
