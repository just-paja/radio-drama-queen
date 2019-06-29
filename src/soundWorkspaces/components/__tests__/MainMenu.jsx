import React from 'react'

import { renderWithContainers } from '../../../mock'
import { MainMenu } from '..'

describe('MainMenu component', () => {
  it('renders active story name', () => {
    const comp = renderWithContainers(<MainMenu />, {
      entities: {
        stories: [
          {
            name: 'Foo'
          }
        ]
      },
      soundWorkspaces: {
        ui: {
          story: 'Foo'
        }
      }
    })
    expect(comp).toIncludeText('Foo')
  })
})
