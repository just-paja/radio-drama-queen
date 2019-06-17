import React from 'react'

import { workspace } from '../../actions'
import { renderWithDnd } from '../../../../mock'
import { SoundBoardView } from '..'

describe('SoundBoardView component', () => {
  const state = {
    soundBoards: {
      list: [
        {
          uuid: 'sd6f4sd6f4'
        }
      ]
    },
    sounds: {
      list: [
        {
          name: 'foo',
          uuid: 'foo',
          tags: []
        }
      ]
    }
  }
  it('renders sound board when viewing sound boards', () => {
    const comp = renderWithDnd(<SoundBoardView board='sd6f4sd6f4' />, state)
    expect(comp.find('SoundBoard')).toHaveProp('uuid', 'sd6f4sd6f4')
  })

  it('dispatches select view with target on sound picker open', () => {
    const comp = renderWithDnd(<SoundBoardView board='sd6f4sd6f4' />, state)
    comp.find('SoundBoardView').props().onSoundPickerOpen({
      board: 'board-1',
      category: 'category-1'
    })
    expect(comp.store.getActions()).toContainEqual(workspace.selectView('VIEW_LIBRARY', {
      target: {
        board: 'board-1',
        category: 'category-1'
      }
    }))
  })
})
