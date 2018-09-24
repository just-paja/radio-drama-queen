import boardUi from '../boardUi';

import { categoryCreate } from '../../actions';

describe('boardUi reducer', () => {
  it('sets show create form flag to true on form show', () => {
    const state = {
      showCreateForm: false,
    };
    const result = boardUi(state, categoryCreate.formShow());
    expect(result).not.toEqual(state);
    expect(result).toHaveProperty('showCreateForm', true);
  });

  it('sets show create form flag to false on form hide', () => {
    const state = {
      showCreateForm: true,
    };
    const result = boardUi(state, categoryCreate.formHide());
    expect(result).not.toEqual(state);
    expect(result).toHaveProperty('showCreateForm', false);
  });
});
