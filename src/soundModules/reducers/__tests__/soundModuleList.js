import soundModuleList from '../soundModuleList';

import { soundModule as actions } from '../../actions';

describe('soundModuleList reducer', () => {
  it('adds a new sound module on add action', () => {
    const state = [];
    const result = soundModuleList(state, actions.add({
      name: '13',
    }));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      name: '13',
    }));
  });

  it('removes a sound module on remove action', () => {
    const state = [
      { name: '13' },
    ];
    const result = soundModuleList(state, actions.remove('13'));
    expect(result).not.toEqual(state);
    expect(result).not.toContainEqual(expect.objectContaining({
      name: '13',
    }));
  });

  it('keeps previous state on nonexistent sound module remove', () => {
    const state = [
      { name: '13' },
    ];
    const result = soundModuleList(state, actions.remove(14));
    expect(result).toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      name: '13',
    }));
  });

  it('sets loading flag to true on download request', () => {
    const state = [
      {
        loading: false,
        name: '13',
      },
    ];
    const result = soundModuleList(state, actions.downloadRequest('13'));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      name: '13',
      loading: true,
    }));
  });

  it('removes loading flag on download success', () => {
    const state = [
      {
        loading: true,
        name: '13',
      },
    ];
    const result = soundModuleList(state, actions.downloadSuccess('13'));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      name: '13',
      loading: false,
    }));
  });

  it('removes loading flag on download failure', () => {
    const state = [
      {
        loading: true,
        name: '13',
      },
    ];
    const result = soundModuleList(state, actions.downloadFailure('13'));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      name: '13',
      loading: false,
    }));
  });
});
