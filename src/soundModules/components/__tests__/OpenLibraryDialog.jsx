import React from 'react'

import { OpenLibraryDialog } from '../OpenLibraryDialog'
import { renderWithContainers } from '../../../../mock'

describe('OpenLibraryDialog component', () => {
  it('renders url input', () => {
    const comp = renderWithContainers(
      <OpenLibraryDialog />,
      {
        soundModules: {
          ui: {
            showOpenLibraryDialog: true
          }
        }
      }
    )
    expect(comp).toContainMatchingElement('Field[name="url"]')
  })

  it('renders open button as submit', () => {
    const comp = renderWithContainers(
      <OpenLibraryDialog />,
      {
        soundModules: {
          ui: {
            showOpenLibraryDialog: true
          }
        }
      }
    )
    expect(comp.find('OpenButton')).toHaveProp('type', 'submit')
  })
})
