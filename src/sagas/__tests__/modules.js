import { tagList } from '../../actions';

import sagas from '../tags';
import getSagaTester from '../../../mock/sagaTester';

describe('modules saga', () => {
  it('creates new tag given it does not already exist', () => {
    const sagaTester = getSagaTester({});
    sagaTester.runAll(sagas);
    sagaTester.dispatch(tagList.create(null, { name: 'foo' }));
    expect(sagaTester.getState().tags).toContainEqual({
      name: 'foo',
    });
  });

  it('does not create new tag given it already exists', () => {
    const sagaTester = getSagaTester({
      tags: [
        {
          name: 'foo',
        },
      ],
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(tagList.create(null, { name: 'foo' }));
    expect(sagaTester.getState().tags.length).toEqual(1);
  });
});
