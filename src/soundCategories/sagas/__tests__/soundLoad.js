import sagas from '..';
import getSagaTester from '../../../../mock/sagaTester';

import { categoryList } from '../../actions';
import { soundList } from '../../../sounds/actions';

describe('soundLoad saga', () => {
  it('triggers sound load on category sound add', () => {
    const sagaTester = getSagaTester({
      soundCategories: {
        list: [
          {
            uuid: 'category-1',
            sounds: [],
          },
        ],
      },
      sounds: {
        list: [
          {
            uuid: 'sound-1',
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(categoryList.soundAdd('category-1', 'sound-1'));
    expect(sagaTester.getCalledActions()).toContainEqual(soundList.loadTrigger('sound-1'));
  });
});
