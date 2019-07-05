import React from 'react'

import { renderWithContainers } from '../../../mock'
import { BoardEmpty } from '..'

describe('BoardEmpty component', () => {
  it('renders CanvasMessage', () => {
    const comp = renderWithContainers(<BoardEmpty />)
    expect(comp).toContainMatchingElements(1, 'CanvasMessage')
  })
})
