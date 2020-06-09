import React from 'react'

import { Gallery } from '..'
import { renderWithContainers } from '../../../mock'

describe('Gallery container', () => {
  it('provides sounds', () => {
    const state = {
      entities: {
        categories: [],
        sounds: [
          {
            name: 'foo',
            cachePath: 'foo',
            tags: []
          }
        ]
      }
    }
    const markup = (
      <Gallery
        onAddSound={() => {}}
        onAddTag={() => {}}
        onBoardCreate={() => {}}
        onConfigOpen={() => {}}
        onGoBack={() => {}}
        onLibraryOpen={() => {}}
      />
    )
    const comp = renderWithContainers(markup, state)
    expect(comp.find('Gallery')).toHaveProp('librarySize', 1)
  })
})
