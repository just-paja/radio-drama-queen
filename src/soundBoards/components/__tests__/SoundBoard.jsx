import React from 'react'

import { renderWithDnd } from '../../../../mock'
import { SoundBoard } from '..'

describe('SoundBoard component', () => {
  const state = {
    soundBoards: {
      list: [
        {
          name: 'Board 1',
          uuid: 'board-1'
        }
      ],
      ui: {
        showCreateForm: true
      }
    },
    soundCategories: {
      list: [
        {
          name: 'foo',
          uuid: 'category-1',
          board: 'board-1',
          sounds: [],
          volume: 1
        },
        {
          name: 'foo',
          uuid: 'category-2',
          board: 'board-1',
          sounds: [],
          volume: 1
        },
        {
          name: 'foo',
          uuid: 'category-3',
          board: 'board-2',
          sounds: [],
          volume: 1
        }
      ]
    },
    sounds: {
      list: []
    }
  }

  it('renders board speed dial', () => {
    const comp = renderWithDnd(
      <SoundBoard
        uuid='board-1'
        onSoundPickerOpen={() => {}}
        categories={[]}
      />,
      state
    )
    expect(comp).toContainMatchingElement('Connect(SoundBoardSpeedDial)')
  })

  it('renders create form when given showCreateForm flag', () => {
    const comp = renderWithDnd(
      <SoundBoard
        uuid='board-1'
        onSoundPickerOpen={() => {}}
        categories={[]}
      />,
      state
    )
    expect(comp).toContainMatchingElement('SoundBoardCategoryCreateForm')
  })

  it('renders categories', () => {
    const comp = renderWithDnd(
      <SoundBoard
        uuid='board-1'
        onSoundPickerOpen={() => {}}
      />,
      state
    )
    expect(comp).toContainMatchingElement('SoundBoardCategory')
  })
})
