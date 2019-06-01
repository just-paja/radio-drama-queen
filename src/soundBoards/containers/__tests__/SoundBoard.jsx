import React from 'react';
import SoundBoard from '../SoundBoard';

import { renderWithDnd } from '../../../../mock';

describe('SoundBoard container', () => {
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
            sounds: [],
            volume: 1,
          },
          {
            name: 'foo',
            uuid: 'category-2',
            board: 'board-1',
            sounds: [],
            volume: 1,
          },
          {
            name: 'foo',
            uuid: 'category-3',
            board: 'board-2',
            sounds: [],
            volume: 1,
          },
        ],
      },
      sounds: {
        list: [],
      }
    };
    comp = renderWithDnd(<SoundBoard onSoundPickerOpen={() => {}} uuid="board-1" />, state);
  });

  it('provides category uuid list', () => {
    expect(comp.find('SoundBoard')).toHaveProp('categories', [
      'category-1',
      'category-2',
    ]);
  });

  it('provides showCreateForm flag', () => {
    expect(comp.find('SoundBoard')).toHaveProp('showCreateForm', true);
  });
});
