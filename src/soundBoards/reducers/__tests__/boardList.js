import boardList from '../boardList';

import { soundBoard as boardActions } from '../../actions';

describe('boardList reducer', () => {
  it('adds a new board on board list add', () => {
    const state = [];
    const result = boardList(state, boardActions.add({
      uuid: 13,
    }));
    expect(result).not.toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
    }));
  });

  it('removes a board on board list remove', () => {
    const state = [
      { uuid: 13 },
    ];
    const result = boardList(state, boardActions.remove(13));
    expect(result).not.toEqual(state);
    expect(result).not.toContainEqual(expect.objectContaining({
      uuid: 13,
    }));
  });

  it('keeps previous state on nonexistent board list remove', () => {
    const state = [
      { uuid: 13 },
    ];
    const result = boardList(state, boardActions.remove(14));
    expect(result).toEqual(state);
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
    }));
  });

  it('sets board name on rename', () => {
    const state = [
      {
        name: 'Test Board',
        uuid: 13,
      },
    ];
    const result = boardList(state, boardActions.rename(13, 'Super Test Board'));
    expect(result).toContainEqual(expect.objectContaining({
      uuid: 13,
      name: 'Super Test Board',
    }));
  });
});
