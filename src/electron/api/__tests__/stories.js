import { startBackend } from '..'
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

  it('listStories returns empty array given story directory does not exist', () => {
    app.config.paths.stories = getLocalUrl('nonexistent-story-folder')
    return app.handleIncomingAction(storyRoutines.list.request()).then(results => {
      expect(results).toContainEqual(storyRoutines.list.success([]))
    })
  })
})
