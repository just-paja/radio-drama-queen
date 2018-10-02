import sagas from '..';
import getSagaTester from '../../../../mock/sagaTester';

import { soundBoard } from '../../actions';

describe('boardSoundDrop saga', () => {
  it('adds sound to the default board category', () => {
    const onError = jest.fn();
    const sagaTester = getSagaTester({
      soundBoards: {
        list: [
          {
            uuid: 'board-1',
          },
        ],
      },
      soundCategories: {
        list: [
          {
            uuid: 'category-1',
            board: 'board-1',
            name: null,
            sounds: [],
          },
        ],
      },
      sounds: {
        list: [
          {
            uuid: 'sound-1',
            path: 'http://example.com/sound.mp3',
          }
        ],
      },
    }, {
      options: {
        onError,
      },
    });
    const getItem = jest.fn().mockReturnValue({
      uuid: 'sound-1'
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundBoard.soundDrop('board-1', {
      getItem,
    }));
    expect(sagaTester.getState().soundCategories.list).toContainEqual(
      expect.objectContaining({
        name: null,
        board: 'board-1',
        sounds: ['sound-1'],
      })
    );
  });

  it('removes sound from all other categories', () => {
    const onError = jest.fn();
    const sagaTester = getSagaTester({
      soundBoards: {
        list: [
          {
            uuid: 'board-1',
          },
        ],
      },
      soundCategories: {
        list: [
          {
            uuid: 'category-1',
            board: 'board-1',
            name: 'foo',
            sounds: ['sound-1'],
          },
          {
            uuid: 'category-2',
            board: 'board-1',
            name: 'bar',
            sounds: ['sound-1'],
          },
          {
            uuid: 'category-3',
            board: 'board-1',
            name: null,
            sounds: [],
          },
        ],
      },
      sounds: {
        list: [
          {
            uuid: 'sound-1',
            path: 'http://example.com/sound.mp3',
          }
        ],
      },
    }, {
      options: {
        onError,
      },
    });
    const getItem = jest.fn().mockReturnValue({
      uuid: 'sound-1'
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundBoard.soundDrop('board-1', {
      getItem,
    }));
    expect(sagaTester.getState().soundCategories.list).toContainEqual(
      expect.objectContaining({
        uuid: 'category-1',
        board: 'board-1',
        sounds: [],
      })
    );
    expect(sagaTester.getState().soundCategories.list).toContainEqual(
      expect.objectContaining({
        uuid: 'category-2',
        board: 'board-1',
        sounds: [],
      })
    );
    expect(sagaTester.getState().soundCategories.list).toContainEqual(
      expect.objectContaining({
        uuid: 'category-3',
        board: 'board-1',
        sounds: ['sound-1'],
      })
    );
  });

  it('creates default category given it does not exist and adds sound to the board', () => {
    const onError = jest.fn();
    const sagaTester = getSagaTester({
      soundBoards: {
        list: [
          {
            uuid: 'board-1',
          },
        ],
      },
      sounds: {
        list: [
          {
            uuid: 'sound-1',
            path: 'http://example.com/sound.mp3',
          }
        ],
      },
    }, {
      options: {
        onError,
      },
    });
    const getItem = jest.fn().mockReturnValue({
      uuid: 'sound-1'
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundBoard.soundDrop('board-1', {
      getItem,
    }));
    expect(sagaTester.getState().soundCategories.list).toContainEqual(
      expect.objectContaining({
        name: null,
        board: 'board-1',
        sounds: ['sound-1'],
      })
    );
  });

  it('does not fail given the board does not exist', () => {
    const onError = jest.fn();
    const sagaTester = getSagaTester({
      sounds: {
        list: [
          {
            uuid: 'sound-1',
            path: 'http://example.com/sound.mp3',
          }
        ],
      },
    }, {
      options: {
        onError,
      },
    });
    const getItem = jest.fn().mockReturnValue({
      uuid: 'sound-1'
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundBoard.soundDrop('board-1', {
      getItem,
    }));
    expect(onError).not.toHaveBeenCalled();
  });
});
