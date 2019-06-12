import React from 'react'

import { renderWithDnd } from '../../../../mock'
import { WorkspaceView } from '..'

describe('WorkspaceView component', () => {
  it('renders sound gallery view when viewing library', () => {
    const comp = renderWithDnd(<WorkspaceView />, {
      soundWorkspaces: {
        ui: {
          view: 'VIEW_LIBRARY'
        }
      }
    })
    expect(comp).toContainMatchingElements(1, 'Connect(SoundGalleryView)')
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
          board: 'test123',
          view: 'VIEW_BOARD'
        }
      }
    })
    expect(comp).toContainMatchingElements(1, 'Connect(SoundBoardView)')
  })

  it('renders empty when given board view but no board', () => {
    const comp = renderWithDnd(<WorkspaceView />, {
      soundWorkspaces: {
        ui: {
          view: 'VIEW_BOARD'
        }
      }
    })
    expect(comp).toBeEmptyRender()
  })

  it('renders empty when given no view', () => {
    const comp = renderWithDnd(<WorkspaceView />, {
      soundWorkspaces: {
        ui: {
          view: null
        }
      }
    }).find('WorkspaceView')
    expect(comp).toBeEmptyRender()
  })
})
