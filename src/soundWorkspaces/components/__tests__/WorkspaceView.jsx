import React from 'react'

import { renderWithDnd } from '../../../../mock'
import { WorkspaceView } from '..'

describe('WorkspaceView component', () => {
  it('renders sidebard', () => {
    const comp = renderWithDnd(<WorkspaceView />)
    expect(comp).toContainMatchingElement('WorkspaceSidebar')
  })

  it('renders sound gallery view when viewing library', () => {
    const comp = renderWithDnd(<WorkspaceView />, {
      soundWorkspaces: {
        ui: {
          story: 'x1',
          view: 'VIEW_LIBRARY'
        }
      },
      sounds: {
        list: [
          {
            tags: [],
            uuid: 's1'
          }
        ]
      }
    })
    expect(comp).toContainMatchingElement('SoundGalleryView')
  })

  it('renders sound board when viewing sound boards', () => {
    const comp = renderWithDnd(<WorkspaceView />, {
      soundBoards: {
        list: [
          {
            uuid: 'test123'
          }
        ]
      },
      soundWorkspaces: {
        ui: {
          story: 'x1',
          board: 'test123',
          view: 'VIEW_BOARD'
        }
      },
      sounds: {
        list: [
          {
            tags: [],
            uuid: 's1'
          }
        ]
      }
    })
    expect(comp).toContainMatchingElement('SoundBoardView')
  })

  it('renders empty when given board view but no board', () => {
    const comp = renderWithDnd(<WorkspaceView />, {
      soundWorkspaces: {
        ui: {
          story: 'x1',
          view: 'VIEW_BOARD'
        }
      }
    })
    expect(comp).toContainMatchingElement('WorkspaceEmpty')
  })

  it('renders workspace empty board dialog given view is null', () => {
    const comp = renderWithDnd(<WorkspaceView />, {
      soundWorkspaces: {
        ui: {
          view: null
        }
      }
    })
    expect(comp).toContainMatchingElement('WorkspaceEmpty')
  })
})
