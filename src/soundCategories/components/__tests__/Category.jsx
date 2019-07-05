import React from 'react'

import { Category } from '..'
import { renderWithDnd } from '../../../mock'

describe('Category component', () => {
  it('renders category name', () => {
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
            board: 'board-1',
            name: 'Test category',
            uuid: 'category-1',
            volume: 50,
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
      <Category onSoundPickerOpen={() => {}} uuid='category-1' />,
      state
    )
    expect(comp.find('CategoryName')).toHaveProp('name', 'Test category')
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
            board: 'board-1',
            uuid: 'category-1',
            volume: 50,
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
            board: 'board-1',
            uuid: 'category-1',
            volume: 50,
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
})
