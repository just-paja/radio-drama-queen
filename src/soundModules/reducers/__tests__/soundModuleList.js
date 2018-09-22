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

  it('sets loading flag to true on load request', () => {
    const state = [
      {
        loading: false,
        name: '13',
      },
    ];
    const result = soundModuleList(state, actions.loadRequest('13'));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      name: '13',
      loading: true,
    }));
  });

  it('saves module data on load success', () => {
    const state = [
      {
        loading: true,
        name: '13',
      },
    ];
    const result = soundModuleList(state, actions.loadSuccess('13', {
      tags: [
        {
          name: 'foo',
        },
      ],
      sounds: [
        {
          name: 'foo.mp3',
          tags: ['foo'],
        },
      ],
    }));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      name: '13',
      loading: true,
      tags: [
        {
          name: 'foo',
        },
      ],
      sounds: [
        {
          name: 'foo.mp3',
          tags: ['foo'],
        },
      ],
    }));
  });

  it('removes loading flag on load fulfill', () => {
    const state = [
      {
        loading: true,
        name: '13',
      },
    ];
    const result = soundModuleList(state, actions.loadFulfill('13'));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      name: '13',
      loading: false,
    }));
  });

  it('saves error on load failure', () => {
    const testError = new Error('test!');
    const state = [
      {
        loading: true,
        name: '13',
      },
    ];
    const result = soundModuleList(state, actions.loadFailure('13', testError));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      name: '13',
      loading: true,
      error: testError,
    }));
  });
});
