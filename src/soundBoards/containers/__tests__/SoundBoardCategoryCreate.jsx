import React from 'react';
import SoundBoardCategoryCreate from '../SoundBoardCategoryCreate';

import { renderWithContainers } from '../../../../mock';
import { categoryCreate } from '../../actions';

describe('SoundBoardCategoryCreate container', () => {
  let comp;

  beforeEach(() => {
    comp = renderWithContainers(<SoundBoardCategoryCreate board="board-1" />);
  });

  it('dispatches form hide action on cancel', () => {
    comp.find('SoundBoardCategoryCreateForm').props().onCancel();
    expect(comp.store.getActions()).toContainEqual(categoryCreate.formHide());
  });

  it('dispatches form submit with values and board', () => {
    comp.find('SoundBoardCategoryCreateForm').props().onSubmit(
      { name: 'foo' },
      () => {},
      { board: 'board-1' }
    );
    expect(comp.store.getActions()).toContainEqual(categoryCreate.submit(
      { name: 'foo' },
      { board: 'board-1' }
    ));
  });
});
