import React from 'react'

import { renderWithContainers } from '../../../mock'
import { ActiveStory } from '..'

describe('ActiveStory component', () => {
  it('renders active story name', () => {
    const comp = renderWithContainers(<ActiveStory />, {
      entities: {
        stories: [
          {
            name: 'Foo',
            uuid: 'story-1'
          }
        ]
      },
      soundWorkspaces: {
        ui: {
          story: 'story-1'
        }
      }
    })
    expect(comp).toIncludeText('Foo')
  })
})
