import React from 'react'
import SoundGallery from '../SoundGallery'

import { renderWithContainers } from '../../../mock'

describe('SoundGallery container', () => {
  it('provides sounds', () => {
    const state = {
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
    const comp = renderWithContainers(
      <SoundGallery
        onAddSound={() => {}}
        onAddTag={() => {}}
        onBoardCreate={() => {}}
        onConfigOpen={() => {}}
        onGoBack={() => {}}
        onLibraryOpen={() => {}}
        onSoundAdd={() => {}}
      />,
      state
    )
    expect(comp.find('SoundGallery')).toHaveProp('librarySize', 1)
  })
})
