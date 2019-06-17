import React from 'react'

import { renderWithContainers } from '../../../../mock'
import { WorkspaceSelection } from '..'

describe('WorkspaceSelection component', () => {
  it('renders view library button', () => {
    const comp = renderWithContainers(<WorkspaceSelection />)
    expect(comp).toContainMatchingElement('ForwardRef(BottomNavigationAction)[value="VIEW_LIBRARY"]')
  })

  it('triggers view change on toggle button group change', () => {
    const comp = renderWithContainers(<WorkspaceSelection />)
    comp.find('ForwardRef(BottomNavigationAction)[value="VIEW_LIBRARY"]').simulate('click')
    expect(comp.store.getActions()).toContainEqual({
      type: 'WORKSPACE/SELECT_VIEW',
      payload: 'VIEW_LIBRARY'
    })
  })
})
