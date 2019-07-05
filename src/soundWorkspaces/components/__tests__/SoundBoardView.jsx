import React from 'react'

import { workspaceRoutines } from '../../actions'
import { renderWithDnd } from '../../../mock'
import { SoundBoardView } from '..'

describe('SoundBoardView component', () => {
  const state = {
    entities: {
      boards: [
        { uuid: 'sd6f4sd6f4' }
      ],
      sounds: [
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
    expect(comp.find('Board')).toHaveProp('uuid', 'sd6f4sd6f4')
  })

  it('dispatches select view with target on sound picker open', () => {
    const comp = renderWithDnd(<SoundBoardView board='sd6f4sd6f4' />, state)
    comp.find('SoundBoardView').props().onSoundPickerOpen({
      board: 'board-1',
      category: 'category-1'
    })
    expect(comp.store.getActions()).toContainEqual(workspaceRoutines.selectView('VIEW_LIBRARY', {
      target: {
        board: 'board-1',
        category: 'category-1'
      }
    }))
  })
})
