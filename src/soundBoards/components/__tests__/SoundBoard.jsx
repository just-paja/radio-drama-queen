import React from 'react'

import { renderWithDnd } from '../../../mock'
import { Board } from '..'

describe('Board component', () => {
  const state = {
    entities: {
      boards: [
        {
          name: 'Board 1',
          uuid: 'board-1'
        }
      ],
      categories: [
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
      ],
      sounds: []
    }
  }

  it('renders board speed dial', () => {
    const comp = renderWithDnd(
      <Board
        uuid='board-1'
        onSoundPickerOpen={() => {}}
        categories={[]}
      />,
      state
    )
    expect(comp).toContainMatchingElement('BoardSpeedDial')
  })

  it('renders categories', () => {
    const comp = renderWithDnd(
      <Board
        uuid='board-1'
        onSoundPickerOpen={() => {}}
      />,
      state
    )
    expect(comp).toContainMatchingElement('BoardCategory[uuid="category-1"]')
  })
})
