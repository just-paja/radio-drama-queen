import ui from '../ui'

import { workspaceRoutines } from '../../actions'

describe('ui reducer', () => {
  it('saves library view selection', () => {
    const state = { view: 'VIEW_BOARD' }
    const result = ui(state, workspaceRoutines.selectView('VIEW_LIBRARY'))
    expect(result).not.toEqual(state)
    expect(result).toHaveProperty('view', 'VIEW_LIBRARY')
  })

  it('sets view to board on board selection', () => {
    const state = { view: 'VIEW_LIBRARY' }
    const result = ui(state, workspaceRoutines.selectBoard('board1'))
    expect(result).not.toEqual(state)
    expect(result).toHaveProperty('view', 'VIEW_BOARD')
  })

  it('saves board selection on board select', () => {
    const state = { view: 'VIEW_LIBRARY' }
    const result = ui(state, workspaceRoutines.selectBoard('board1'))
    expect(result).not.toEqual(state)
    expect(result).toHaveProperty('board', 'board1')
  })
})
