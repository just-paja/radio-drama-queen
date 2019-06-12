import React from 'react'

import { SoundGalleryView } from '..'
import { renderWithContainers } from '../../../../mock'
import { workspace, workspaceSound, workspaceTag } from '../../actions'
import { soundBoard } from '../../../soundBoards/actions'
import { libraryLoad } from '../../../soundModules/actions'

describe('SoundGalleryView container', () => {
  let comp

  beforeEach(() => {
    comp = renderWithContainers(<SoundGalleryView />, {
      sounds: {
        list: [
          {
            name: 'foo',
            uuid: 'foo',
            tags: []
          }
        ]
      }
    })
  })

  it('dispatches sound.addToBoard on sound add to board', () => {
    comp.find('SoundGalleryView').props().onAddSoundToBoard('sound-1', {
      board: 'board-1',
      category: 'category-1'
    })
    expect(comp.store.getActions()).toContainEqual(workspaceSound.addToBoard('sound-1', {
      board: 'board-1',
      category: 'category-1'
    }))
  })

  it('dispatches tag.addToBoard on tag add to board', () => {
    comp.find('SoundGalleryView').props().onAddTagToBoard('tag-1', {
      board: 'board-1',
      category: 'category-1'
    })
    expect(comp.store.getActions()).toContainEqual(workspaceTag.addToBoard('tag-1', {
      board: 'board-1',
      category: 'category-1'
    }))
  })

  it('dispatches soundBoard.create on board create', () => {
    comp.find('SoundGalleryView').props().onBoardCreate()
    expect(comp.store.getActions()).toContainEqual(soundBoard.create())
  })

  it('dispatches workspace.goBack on gallery go back', () => {
    comp.find('SoundGalleryView').props().onGalleryGoBack({
      board: 'board-1',
      category: 'category-1'
    })
    expect(comp.store.getActions()).toContainEqual(workspace.goBack({
      board: 'board-1',
      category: 'category-1'
    }))
  })

  it('dispatches libraryLoad show dialog on library open', () => {
    comp.find('SoundGalleryView').props().onLibraryOpen()
    expect(comp.store.getActions()).toContainEqual(libraryLoad.dialogShow())
  })
})
