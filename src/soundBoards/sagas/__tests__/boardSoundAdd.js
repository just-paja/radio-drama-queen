import sagas from '..';
import getSagaTester from '../../../../mock/sagaTester';

import { soundBoard } from '../../actions';

describe('boardSoundAdd saga', () => {
  it('creates default board category with the sound given it does not exist', () => {
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
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundBoard.soundAdd('board-1', 'sound-1'));
    expect(sagaTester.getState().soundCategories.list).toContainEqual(
      expect.objectContaining({
        name: null,
        board: 'board-1',
        sounds: ['sound-1'],
      })
    );
  });

  it('adds sound to the default board category given it exists', () => {
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
            sounds: [],
          }
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
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundBoard.soundAdd('board-1', 'sound-1'));
    expect(sagaTester.getState().soundCategories.list).toContainEqual(
      expect.objectContaining({
        uuid: 'category-1',
        board: 'board-1',
        sounds: ['sound-1'],
      })
    );
  });
});
