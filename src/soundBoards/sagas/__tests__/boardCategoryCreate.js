import sagas from '..';
import getSagaTester from '../../../../mock/sagaTester';

import { initialize } from 'redux-form';

import { categoryCreate } from '../../actions';

describe('categoryCreate saga', () => {
  it('creates category on submit', () => {
    const sagaTester = getSagaTester({});
    sagaTester.runAll(sagas);
    sagaTester.dispatch(initialize('categoryCreate', {
      name: 'foo',
    }));
    sagaTester.dispatch(categoryCreate.submit({ name: 'foo' }, { board: '3' }));
    expect(sagaTester.getState().soundCategories.list).toContainEqual(
      expect.objectContaining({
        name: 'foo',
      })
    );
  });
});
