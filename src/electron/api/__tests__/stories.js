import { configureApi } from '..'
import { storyRoutines } from '../../../soundStories/actions'

import jetpack from 'fs-jetpack'

jest.mock('electron', () => ({
  ipcMain: {
    on: jest.fn()
  }
}))

function getLocalUrl (...fixturePath) {
  return `file://${jetpack.path(__dirname, 'fixtures', ...fixturePath)}`
}

describe('Stories handler', () => {
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

  it('listStories loads list of stories', () => {
    return api.handleIncomingAction(storyRoutines.list.request()).then(results => {
      expect(results).toContainEqual(
        storyRoutines.list.success(expect.objectContaining({
          driver: 'local',
          name: 'Manifest Test Module',
          url: getLocalUrl('manifest')
        }))
      )
    })
  })
})
