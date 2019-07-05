import React from 'react'

import { boardRoutines } from '../../actions'
import { renderWithContainers } from '../../../mock'
import { BoardSpeedDial } from '..'

describe('BoardSpeedDial component', () => {
  it('triggers onBoardCreate on create board action click', () => {
    const comp = renderWithContainers(
      <BoardSpeedDial boardUuid='x32' />
    )
    comp.find('button[title="Create Board"]').simulate('click')
    expect(comp.store.getActions()).toContainEqual(boardRoutines.create())
  })

  it('triggers onCategoryCreate on create board action click', () => {
    const comp = renderWithContainers(
      <BoardSpeedDial boardUuid='x32' />
    )
    comp.find('button[title="Create Category"]').simulate('click')
    expect(comp.store.getActions()).toContainEqual(boardRoutines.createCategory('x32'))
  })
})
