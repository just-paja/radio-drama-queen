import categoryGrid from '../categoryGrid';

import { categoryCreate } from '../../actions';

describe('categoryGrid reducer', () => {
  it('sets show create form flag to true on form show', () => {
    const state = {
      showCreateForm: false,
    };
    const result = categoryGrid(state, categoryCreate.formShow());
    expect(result).not.toEqual(state);
    expect(result).toHaveProperty('showCreateForm', true);
  });

  it('sets show create form flag to false on form hide', () => {
    const state = {
      showCreateForm: true,
    };
    const result = categoryGrid(state, categoryCreate.formHide());
    expect(result).not.toEqual(state);
    expect(result).toHaveProperty('showCreateForm', false);
  });
});
