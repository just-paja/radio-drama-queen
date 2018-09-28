import soundList from '../soundList';

import { soundList as soundListActions } from '../../actions';

describe('soundList reducer', () => {
  it('adds a new sound on sound list add', () => {
    const state = [];
    const result = soundList(state, soundListActions.add({
      uuid: 13,
    }));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
    }));
  });

  it('removes a sound on sound list remove', () => {
    const state = [
      { uuid: 13 },
    ];
    const result = soundList(state, soundListActions.remove(13));
    expect(result).not.toEqual(state);
    expect(result).not.toContainEqual(expect.objectContaining({
      uuid: 13,
    }));
  });

  it('keeps previous state on nonexistent sound list remove', () => {
    const state = [
      { uuid: 13 },
    ];
    const result = soundList(state, soundListActions.remove(14));
    expect(result).toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
    }));
  });

  it('sets playing flag to true on play', () => {
    const state = [
      {
        playing: false,
        uuid: 13,
      },
    ];
    const result = soundList(state, soundListActions.play(13));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
      playing: true,
    }));
  });

  it('sets playing flag to false on play failure', () => {
    const state = [
      {
        playing: true,
        uuid: 13,
      },
    ];
    const result = soundList(state, soundListActions.playFailure(13));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
      playing: false,
    }));
  });

  it('saves error on play failure', () => {
    const testError = new Error('Test!');
    const state = [
      {
        playing: true,
        uuid: 13,
      },
    ];
    const result = soundList(state, soundListActions.playFailure(13, testError));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
      error: testError,
    }));
  });

  it('sets playing flag to false on finish', () => {
    const state = [
      {
        playing: true,
        uuid: 13,
      },
    ];
    const result = soundList(state, soundListActions.finished(13));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
      playing: false,
    }));
  });

  it('sets playing flag to false on stop', () => {
    const state = [
      {
        playing: true,
        uuid: 13,
      },
    ];
    const result = soundList(state, soundListActions.stop(13));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
      playing: false,
    }));
  });

  it('sets loading flag to true on load request', () => {
    const state = [
      {
        loading: false,
        uuid: 13,
      },
    ];
    const result = soundList(state, soundListActions.loadRequest(13));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
      loading: true,
    }));
  });

  it('sets valid flag to true on load success', () => {
    const state = [
      {
        loading: true,
        uuid: 13,
      },
    ];
    const result = soundList(state, soundListActions.loadSuccess(13));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
      valid: true,
    }));
  });

  it('sets valid flag to false on unload', () => {
    const state = [
      {
        loading: true,
        uuid: 13,
      },
    ];
    const result = soundList(state, soundListActions.unload(13));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
      valid: false,
    }));
  });

  it('saves error on load failure', () => {
    const testError = new Error('Test!');
    const state = [
      {
        loading: true,
        uuid: 13,
      },
    ];
    const result = soundList(state, soundListActions.loadFailure(13, testError));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
      error: testError,
    }));
  });

  it('sets loading flag to false on load fulfill', () => {
    const state = [
      {
        loading: true,
        uuid: 13,
      },
    ];
    const result = soundList(state, soundListActions.loadFulfill(13));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
      loading: false,
    }));
  });

  it('sets name on set name', () => {
    const state = [
      {
        name: null,
        uuid: 13,
      },
    ];
    const result = soundList(state, soundListActions.setName(13, 'foo'));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
      name: 'foo',
    }));
  });
});
