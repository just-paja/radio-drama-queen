import React from 'react'

import { workspaceRoutines } from '../../actions'
import { renderWithContainers } from '../../../mock'
import { WorkspaceSelection } from '..'

describe('WorkspaceSelection component', () => {
  it('renders view library button', () => {
    const comp = renderWithContainers(<WorkspaceSelection />)
    expect(comp).toContainMatchingElement('ForwardRef(ToggleButton)[value="VIEW_LIBRARY"]')
  })

  it('triggers view change on toggle button group change', () => {
    const state = {
      entities: {
        stories: [
          {
            name: 'Story 1',
            uuid: 'story-1'
          }
        ]
      },
      soundWorkspaces: {
        ui: {
          story: 'story-1'
        }
      }
    }
    const comp = renderWithContainers(<WorkspaceSelection />, state)
    comp.find('ForwardRef(ToggleButton)[value="VIEW_LIBRARY"]').simulate('click')
    expect(comp.store.getActions()).toContainEqual(
      workspaceRoutines.selectView('VIEW_LIBRARY')
    )
  })
})
