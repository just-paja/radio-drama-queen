import sagas from '..';
import getSagaTester from '../../../../mock/sagaTester';

import { categoryList } from '../../actions';

describe('categoryRemove saga', () => {
  it('dispatches category stop for removed category', () => {
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
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(categoryList.removeStop('foo'));
    expect(sagaTester.getCalledActions()).toContainEqual(categoryList.stop('foo'));
  });

  it('removes category for the list', () => {
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
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(categoryList.removeStop('foo'));
    expect(sagaTester.getState().soundCategories.list).toHaveLength(0);
  });
});
