import React from 'react';

import { shallow } from 'enzyme';

import SoundBoardCategoryCreate from '../SoundBoardCategoryCreate';

import { mockStore } from '../../../../mock';
import { categoryCreate } from '../../actions';

describe('SoundBoardCategoryCreate container', () => {
  let store;
  let comp;

  beforeEach(() => {
    store = mockStore({});
    comp = shallow(<SoundBoardCategoryCreate board="board-1" />, {
      context: {
        store,
      },
    });
  });

  it('dispatches form hide action on cancel', () => {
    comp.dive().simulate('cancel');
    expect(store.getActions()).toContainEqual(categoryCreate.formHide());
  });

  it('dispatches form submit with values and board', () => {
    comp.dive().dive().simulate(
      'submit',
      { name: 'foo' },
      () => {},
      { board: 'board-1' }
    );
    expect(store.getActions()).toContainEqual(categoryCreate.submit(
      { name: 'foo' },
      { board: 'board-1' }
    ));
  });
});
