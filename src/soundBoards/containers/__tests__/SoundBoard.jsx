import React from 'react';

import { shallow } from 'enzyme';

import SoundBoard from '../SoundBoard';

import { mockStore } from '../../../../mock';

describe('SoundBoard container', () => {
  let store;
  let comp;

  beforeEach(() => {
    const state = {
      soundBoards: {
        list: [
          {
            name: 'Board 1',
            uuid: 'board-1',
          },
        ],
        ui: {
          showCreateForm: true,
        },
      },
      soundCategories: {
        list: [
          {
            name: 'foo',
            uuid: 'category-1',
            board: 'board-1',
          },
          {
            name: 'foo',
            uuid: 'category-2',
            board: 'board-1',
          },
          {
            name: 'foo',
            uuid: 'category-3',
            board: 'board-2',
          },
        ],
      },
    };
    store = mockStore(state);
    comp = shallow(<SoundBoard uuid="board-1" />, {
      context: {
        store,
      },
    });
  });

  it('provides category uuid list', () => {
    expect(comp).toHaveProp('categories', [
      'category-1',
      'category-2',
    ]);
  });

  it('provides showCreateForm flag', () => {
    expect(comp).toHaveProp('showCreateForm', true);
  });
});
