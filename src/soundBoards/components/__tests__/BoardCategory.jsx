import React from 'react'

import { BoardCategory } from '..'
import { renderWithDnd } from '../../../mock'

describe('BoardCategory component', () => {
  it('renders sound category when given uuid', () => {
    const state = {
      entities: {
        categories: [
          {
            board: '13',
            sounds: [],
            uuid: 'foo',
            volume: 50
          }
        ],
        boards: [
          {
            uuid: '13'
          }
        ]
      }
    }
    const markup = (
      <BoardCategory
        onSoundPickerOpen={() => {}}
        uuid={'foo'}
      />
    )
    const comp = renderWithDnd(markup, state)
    expect(comp).toContainMatchingElement('Category[uuid="foo"]')
  })

  it('renders children when given no uuid', () => {
    const comp = renderWithDnd(
      <BoardCategory>
        <div id='foo' />
      </BoardCategory>
    )
    expect(comp.find('#foo')).toHaveLength(1)
  })
})
