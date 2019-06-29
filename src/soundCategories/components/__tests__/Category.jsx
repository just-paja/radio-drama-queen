import React from 'react'

import { Category } from '..'
import { renderWithDnd } from '../../../mock'

describe('Category component', () => {
  it('renders category name', () => {
    const comp = renderWithDnd(
      <Category
        boardUuid='board1'
        onSoundPickerOpen={() => {}}
        connectDropTarget={children => children}
        name='Test category'
        sounds={[]}
        uuid='category-1'
      />
    )
    expect(comp.find('SoundCategoryName')).toHaveProp('name', 'Test category')
  })

  it('renders category sounds', () => {
    const state = {
      entities: {
        boards: [
          {
            uuid: 'board-1',
            categories: ['category-1']
          }
        ],
        categories: [
          {
            uuid: 'category-1',
            sounds: ['sound-1']
          }
        ],
        sounds: [
          {
            uuid: 'sound-1'
          }
        ]
      }
    }
    const comp = renderWithDnd(
      <Category
        onSoundPickerOpen={() => {}}
        uuid='category-1'
      />
    )
    expect(comp.find('CategoryItem')).toHaveProp('uuid', 'sound-1')
  })

  it('renders controls with category uuid', () => {
    const state = {
      entities: {
        boards: [
          {
            uuid: 'board-1',
            categories: ['category-1']
          }
        ],
        categories: [
          {
            uuid: 'category-1',
            sounds: ['sound-1']
          }
        ],
        sounds: [
          {
            uuid: 'sound-1'
          }
        ]
      }
    }
    const comp = renderWithDnd(
      <Category
        onSoundPickerOpen={() => {}}
        uuid='category-1'
      />,
      state
    )
    expect(comp).toContainMatchingElement('CategoryControls[uuid="category-1"]')
  })

  it('renders open snackbar when drag is over and can be dropped', () => {
    const state = {
      entities: {
        boards: [
          {
            uuid: 'board-1',
            categories: ['category-1']
          }
        ],
        categories: [
          {
            uuid: 'category-1',
            sounds: ['sound-1']
          }
        ],
        sounds: [
          {
            uuid: 'sound-1'
          }
        ]
      }
    }
    const comp = renderWithDnd(
      <Category
        onSoundPickerOpen={() => {}}
        canDrop
        isOver
        uuid='category-1'
      />,
      state
    )
    expect(comp.find('WithStyles(ForwardRef(Snackbar))')).toHaveProp('open', true)
  })
})
