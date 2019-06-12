import React from 'react'
import SoundTag from '../SoundTag'

import { renderWithContainers } from '../../../../mock'

describe('SoundTag container', () => {
  let comp

  beforeEach(() => {
    const state = {
      soundTags: {
        list: [
          {
            name: 'foo',
            title: 'Test tag'
          }
        ]
      }
    }
    comp = renderWithContainers(<SoundTag tag='foo' />, state)
  })

  it('provides tag property', () => {
    expect(comp.find('SoundTag')).toHaveProp('tag', {
      name: 'foo',
      title: 'Test tag'
    })
  })
})
