import React from 'react'

import { renderWithContainers } from '../../../mock'
import { SoundGalleryView } from '..'
import { workspace, workspaceSound, workspaceTag } from '../../actions'

describe('SoundGalleryView container', () => {
  let comp

  beforeEach(() => {
    comp = renderWithContainers(<SoundGalleryView />, {
      entities: {
        sounds: [
          {
            name: 'foo',
            uuid: 'foo',
            tags: []
          }
        ]
      }
    })
  })

  it('renders sound gallery', () => {
    expect(comp).toContainMatchingElement('Connect(SoundGallery)')
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
})
