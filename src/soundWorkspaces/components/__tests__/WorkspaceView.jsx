import React from 'react'

import { renderWithDnd } from '../../../mock'
import { WorkspaceView } from '..'

describe('WorkspaceView component', () => {
  it('renders sidebar in board view', () => {
    const comp = renderWithDnd(<WorkspaceView />, {
      soundWorkspaces: {
        ui: {
          view: 'VIEW_BOARD'
        }
      }
    })
    expect(comp).toContainMatchingElement('WorkspaceSidebar')
  })

  it('renders sound gallery view when viewing library', () => {
    const comp = renderWithDnd(<WorkspaceView />, {
      entities: {
        sounds: [
          {
            tags: [],
            uuid: 's1'
          }
        ]
      },
      soundWorkspaces: {
        ui: {
          story: 'x1',
          view: 'VIEW_LIBRARY'
        }
      }
    })
    expect(comp).toContainMatchingElement('SoundGalleryView')
  })

  it('renders sound board when viewing sound boards', () => {
    const comp = renderWithDnd(<WorkspaceView />, {
      entities: {
        boards: [
          { uuid: 'test123' }
        ],
        sounds: [
          {
            tags: [],
            uuid: 's1'
          }
        ]
      },
      soundWorkspaces: {
        ui: {
          story: 'x1',
          board: 'test123',
          view: 'VIEW_BOARD'
        }
      }
    })
    expect(comp).toContainMatchingElement('SoundBoardView')
  })
})
