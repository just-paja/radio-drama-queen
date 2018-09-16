import sagas from '..';
import getSagaTester from '../../../../mock/sagaTester';

import { categoryList } from '../../actions';
import { soundList } from '../../../sounds/actions';

describe('categoryStop saga', () => {
  it('dispatches group stop for all playing sounds in a category', () => {
    const sagaTester = getSagaTester({
      soundCategories: {
        list: [
          {
            uuid: 'foo',
            sounds: ['sound1', 'sound2'],
            volume: 1,
          },
        ],
      },
      sounds: {
        list: [
          {
            uuid: 'sound1',
            playing: true,
          },
          {
            uuid: 'sound2',
            playing: true,
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(categoryList.stop('foo'));
    expect(sagaTester.getCalledActions()).toContainEqual(soundList.groupStop(null, {
      sounds: ['sound1', 'sound2'],
    }));
  });

  it('dispatches group stop omitting not playing sounds in a category', () => {
    const sagaTester = getSagaTester({
      soundCategories: {
        list: [
          {
            uuid: 'foo',
            sounds: ['sound1', 'sound2'],
            volume: 1,
          },
        ],
      },
      sounds: {
        list: [
          {
            uuid: 'sound1',
            playing: true,
          },
          {
            uuid: 'sound2',
            playing: false,
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(categoryList.stop('foo'));
    expect(sagaTester.getCalledActions()).toContainEqual(soundList.groupStop(null, {
      sounds: ['sound1'],
    }));
  });

  it('dispatches group stop omitting a passed exceptional sound uuid', () => {
    const sagaTester = getSagaTester({
      soundCategories: {
        list: [
          {
            uuid: 'foo',
            sounds: ['sound1', 'sound2'],
            volume: 1,
          },
        ],
      },
      sounds: {
        list: [
          {
            uuid: 'sound1',
            playing: true,
          },
          {
            uuid: 'sound2',
            playing: true,
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(categoryList.stop('foo', 'sound2'));
    expect(sagaTester.getCalledActions()).toContainEqual(soundList.groupStop(null, {
      sounds: ['sound1'],
    }));
  });
});
