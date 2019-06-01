import React from 'react';

import { shallow } from 'enzyme';

import { SoundBoardView } from '..';
import { renderWithDnd } from '../../../../mock';
import { workspace } from '../../actions';

describe('SoundBoardView container', () => {
  let comp;

  beforeEach(() => {
    const state = {
      soundBoards: {
        list: [
          {
            uuid: 'sd6f4sd6f4',
          },
        ],
      },
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
    comp = renderWithDnd(<SoundBoardView board="sd6f4sd6f4" />, state);
  });

  it('dispatches select view with target on sound picker open', () => {
    comp.find('SoundBoardView').props().onSoundPickerOpen({
      board: 'board-1',
      category: 'category-1',
    });
    expect(comp.store.getActions()).toContainEqual(workspace.selectView('VIEW_LIBRARY', {
      target: {
        board: 'board-1',
        category: 'category-1',
      },
    }));
  });
});
