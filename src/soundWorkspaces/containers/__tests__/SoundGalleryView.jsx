import React from 'react';

import { shallow } from 'enzyme';

import { SoundGalleryView } from '..';
import { mockStore } from '../../../../mock';
import { workspace, workspaceSound, workspaceTag } from '../../actions';
import { soundBoard } from '../../../soundBoards/actions';
import { libraryLoad } from '../../../soundModules/actions';

describe('SoundGalleryView container', () => {
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
    comp = shallow(<SoundGalleryView />, {
      context: {
        store,
      },
    });
  });

  it('dispatches sound.addToBoard on sound add to board', () => {
    comp.simulate('addSoundToBoard', 'sound-1', {
      board: 'board-1',
      category: 'category-1',
    });
    expect(store.getActions()).toContainEqual(workspaceSound.addToBoard('sound-1', {
      board: 'board-1',
      category: 'category-1',
    }));
  });

  it('dispatches tag.addToBoard on tag add to board', () => {
    comp.simulate('addTagToBoard', 'tag-1', {
      board: 'board-1',
      category: 'category-1',
    });
    expect(store.getActions()).toContainEqual(workspaceTag.addToBoard('tag-1', {
      board: 'board-1',
      category: 'category-1',
    }));
  });

  it('dispatches soundBoard.create on board create', () => {
    comp.simulate('boardCreate');
    expect(store.getActions()).toContainEqual(soundBoard.create());
  });

  it('dispatches workspace.goBack on gallery go back', () => {
    comp.simulate('galleryGoBack', {
      board: 'board-1',
      category: 'category-1',
    });
    expect(store.getActions()).toContainEqual(workspace.goBack({
      board: 'board-1',
      category: 'category-1',
    }));
  });

  it('dispatches libraryLoad show dialog on library open', () => {
    comp.simulate('libraryOpen');
    expect(store.getActions()).toContainEqual(libraryLoad.dialogShow());
  });
});
