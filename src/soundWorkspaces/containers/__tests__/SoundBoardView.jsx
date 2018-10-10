import React from 'react';

import { shallow } from 'enzyme';

import { SoundBoardView } from '..';
import { mockStore } from '../../../../mock';
import { workspace } from '../../actions';

describe('SoundBoardView container', () => {
  let store;
  let comp;

  beforeEach(() => {
    const state = {
      sounds: {
        list: [
          {
            name: 'foo',
            uuid: 'foo',
            tags: [],
          },
        ],
      },
    };
    store = mockStore(state);
    comp = shallow(<SoundBoardView />, {
      context: {
        store,
      },
    });
  });

  it('dispatches select view with target on sound picker open', () => {
    comp.dive().simulate('soundPickerOpen', {
      board: 'board-1',
      category: 'category-1',
    });
    expect(store.getActions()).toContainEqual(workspace.selectView('VIEW_LIBRARY', {
      target: {
        board: 'board-1',
        category: 'category-1',
      },
    }));
  });
});
