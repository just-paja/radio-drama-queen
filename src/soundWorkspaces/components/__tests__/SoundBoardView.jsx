import React from 'react'

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
})
