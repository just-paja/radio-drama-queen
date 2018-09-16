import categoryList from '../categoryList';

import { categoryList as categoryListActions } from '../../actions';

describe('categoryList reducer', () => {
  it('adds a new category on category list add', () => {
    const state = [];
    const result = categoryList(state, categoryListActions.add({
      uuid: 13,
    }));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
    }));
  });

  it('removes a category on category list remove', () => {
    const state = [
      { uuid: 13 },
    ];
    const result = categoryList(state, categoryListActions.remove(13));
    expect(result).not.toEqual(state);
    expect(result).not.toContainEqual(expect.objectContaining({
      uuid: 13,
    }));
  });

  it('keeps previous state on nonexistent category list remove', () => {
    const state = [
      { uuid: 13 },
    ];
    const result = categoryList(state, categoryListActions.remove(14));
    expect(result).toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
    }));
  });

  it('sets loop flag to true on loop toggle given it is in falsy state', () => {
    const state = [
      {
        uuid: 13,
        loop: false,
      },
    ];
    const result = categoryList(state, categoryListActions.loopToggle(13));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      loop: true,
      uuid: 13,
    }));
  });

  it('sets loop flag to false on loop toggle given it is in truthy state', () => {
    const state = [
      {
        loop: true,
        uuid: 13,
      },
    ];
    const result = categoryList(state, categoryListActions.loopToggle(13));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
      loop: false,
    }));
  });

  it('sets mute flag to true on mute toggle given it is in falsy state', () => {
    const state = [
      {
        muted: true,
        uuid: 13,
      },
    ];
    const result = categoryList(state, categoryListActions.muteToggle(13));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
      muted: false,
    }));
  });

  it('sets mute flag to false on mute toggle given it is in truthy state', () => {
    const state = [
      {
        muted: true,
        uuid: 13,
      },
    ];
    const result = categoryList(state, categoryListActions.muteToggle(13));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
      muted: false,
    }));
  });

  it('sets mute flag to false on unmute', () => {
    const state = [
      {
        muted: true,
        uuid: 13,
      },
    ];
    const result = categoryList(state, categoryListActions.unmute(13));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
      muted: false,
    }));
  });

  it('adds new sound on sound add', () => {
    const state = [
      {
        sounds: [
          'http://example.com/sound1.wav',
        ],
        uuid: 13,
      },
    ];
    const result = categoryList(state, categoryListActions.soundAdd(13, 'http://example.com/sound2.wav'));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      sounds: [
        'http://example.com/sound1.wav',
        'http://example.com/sound2.wav',
      ],
      uuid: 13,
    }));
  });

  it('removes existing sound on sound remove', () => {
    const state = [
      {
        sounds: [
          'http://example.com/sound1.wav',
          'http://example.com/sound2.wav',
        ],
        uuid: 13,
      },
    ];
    const result = categoryList(state, categoryListActions.soundRemove(13, 'http://example.com/sound2.wav'));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      sounds: [
        'http://example.com/sound1.wav',
      ],
      uuid: 13,
    }));
  });

  it('keeps state non-existent sound on sound remove', () => {
    const state = [
      {
        sounds: [
          'http://example.com/sound1.wav',
          'http://example.com/sound2.wav',
        ],
        uuid: 13,
      },
    ];
    const result = categoryList(state, categoryListActions.soundRemove(13, 'http://example.com/sound3.wav'));
    expect(result).toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      sounds: [
        'http://example.com/sound1.wav',
        'http://example.com/sound2.wav',
      ],
      uuid: 13,
    }));
  });

  it('sets category volume on set', () => {
    const state = [
      {
        volume: 50,
        uuid: 13,
      },
    ];
    const result = categoryList(state, categoryListActions.setVolume(13, 42));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      volume: 42,
      uuid: 13,
    }));
  });

  it('keeps previous state when category uuid does not exist', () => {
    const state = [
      {
        volume: 50,
        uuid: 13,
      },
    ];
    const result = categoryList(state, categoryListActions.setVolume(130, 42));
    expect(result).toEqual(state);
  });
});
