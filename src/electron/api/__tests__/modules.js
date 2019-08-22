import { configureApi } from '..'
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
  let api = null
  let targetWindow = null

  beforeEach(() => {
    targetWindow = {
      webContents: {
        send: jest.fn()
      }
    }
    api = configureApi(targetWindow)
  })

  afterEach(() => {
    api.terminate()
  })

  it('loadModule loads module using local driver', () => {
    jest.spyOn(api, 'dispatch').mockImplementation(() => {})
    return api.handleIncomingAction(moduleRoutines.load.request({
      driver: 'local',
      url: getLocalUrl('manifest')
    })).then(results => {
      expect(results).toContainEqual(
        moduleRoutines.load.success(expect.objectContaining({
          driver: 'local',
          name: 'Manifest Test Module',
          url: getLocalUrl('manifest')
        }))
      )
    })
  })
})
