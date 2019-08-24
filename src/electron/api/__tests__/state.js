import { startBackend } from '..'
import { workspaceRoutines } from '../../../soundWorkspaces/actions'

jest.mock('electron', () => ({
  ipcMain: {
    on: jest.fn()
  }
}))

describe('State handler', () => {
  let app = null
  let targetWindow = null

  beforeEach(() => {
    targetWindow = {
      webContents: {
        send: jest.fn()
      }
    }
    app = startBackend(targetWindow)
  })

  afterEach(() => {
    app.terminate()
  })

  it('getState returns current app state', () => {
    const { entities, soundWorkspaces } = app.state
    return app.handleIncomingAction(workspaceRoutines.load.request()).then(results => {
      expect(results).toContainEqual(
        workspaceRoutines.load.success({ entities, soundWorkspaces })
      )
    })
  })
})
