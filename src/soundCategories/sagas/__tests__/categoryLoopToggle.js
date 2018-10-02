import sagas from '..';
import getSagaTester from '../../../../mock/sagaTester';

import { categoryList } from '../../actions';

describe('categoryLoopToggle saga', () => {
  it('given loop is off, switches all sounds loop to on', () => {
    const sagaTester = getSagaTester({
      soundCategories: {
        list: [
          {
            uuid: 'category-1',
            sounds: ['sound-1', 'sound-2'],
            loop: false,
            volume: 1,
          },
        ],
      },
      sounds: {
        list: [
          {
            uuid: 'sound-1',
            loop: false,
          },
          {
            uuid: 'sound-2',
            loop: true,
          },
        ],
      }
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(categoryList.loopToggle('category-1'));
    expect(sagaTester.getState().sounds.list).toEqual([
      {
        uuid: 'sound-1',
        loop: true,
      },
      {
        uuid: 'sound-2',
        loop: true,
      },
    ]);
  });

  it('given loop is on, switches all sounds loop to off', () => {
    const sagaTester = getSagaTester({
      soundCategories: {
        list: [
          {
            uuid: 'category-1',
            sounds: ['sound-1', 'sound-2'],
            exclusive: false,
            loop: true,
            volume: 1,
          },
        ],
      },
      sounds: {
        list: [
          {
            uuid: 'sound-1',
            loop: false,
          },
          {
            uuid: 'sound-2',
            loop: true,
          },
        ],
      }
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(categoryList.loopToggle('category-1'));
    expect(sagaTester.getState().sounds.list).toEqual([
      {
        uuid: 'sound-1',
        loop: false,
      },
      {
        uuid: 'sound-2',
        loop: false,
      },
    ]);
  });

  it('does not fail when given non-existent category', () => {
    const onError = jest.fn();
    const sagaTester = getSagaTester({
      soundCategories: {
        list: [],
      },
    }, {
      options: { onError },
    });
    expect(() => {
      sagaTester.runAll(sagas);
      sagaTester.dispatch(categoryList.loopToggle('category-1'));
    }).not.toThrow();
    expect(onError).not.toHaveBeenCalled();
  });
});
