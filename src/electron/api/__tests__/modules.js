import { startBackend } from '..'
import { moduleRoutines } from '../../../soundModules/actions'

import jetpack from 'fs-jetpack'

jest.mock('electron', () => ({
  ipcMain: {
    on: jest.fn()
  }
}))

function getLocalUrl (...fixturePath) {
  return `file://${jetpack.path(__dirname, 'fixtures', ...fixturePath)}`
}

describe('Module handler', () => {
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

  it('loadModule loads module using local driver', () => {
    jest.spyOn(app, 'dispatch').mockImplementation(() => {})
    return app
      .handleIncomingAction(
        moduleRoutines.load.request({
          driver: 'local',
          url: getLocalUrl('manifest')
        })
      )
      .then(results => {
        expect(results).toContainEqual(
          moduleRoutines.load.success(
            expect.objectContaining({
              driver: 'local',
              name: 'Manifest Test Module',
              url: getLocalUrl('manifest')
            })
          )
        )
      })
  })
})
