import React from 'react'

import { renderWithContainers } from '../../../mock'
import { GalleryItemList } from '..'

describe('GalleryItemList component', () => {
  it('renders each sound as SoundGalleryItem', () => {
    const state = {
      entities: {
        sounds: [
          {
            name: 'foo',
            uuid: 'foo',
            tags: []
          },
          {
            name: 'bar',
            uuid: 'bar',
            tags: []
          }
        ]
      }
    }
    const comp = renderWithContainers(
      <GalleryItemList
        onSoundAdd={() => {}}
        onTagAdd={() => {}}
      />,
      state
    )
    expect(comp.find('GalleryItem')).toHaveLength(2)
  })
})
