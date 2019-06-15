import { SoundManager } from './SoundManager'
import { StoryManager } from './StoryManager'

const { BrowserWindow } = require('electron')

const BackendMessenger = require('./BackendMessenger')
const handlers = require('./handlers')

const { soundRead, soundRegister } = require('../sounds/actions')
const { stories, storyCreate } = require('../soundStories/actions')

export function createMainWindow (development) {
  const mainWindow = new BrowserWindow({
    height: 600,
    // icon: path.join(__dirname, '..', 'public', 'favicon.png'),
    minHeight: 320,
    minWidth: 320,
    title: 'Radio Drama Queen',
    width: 960,
    webPreferences: {
      nodeIntegration: true
    }
  })

  const messenger = new BackendMessenger(mainWindow, development)
  const soundManager = new SoundManager()
  const storyManager = new StoryManager()

  messenger.handleAction(soundRegister.REQUEST, soundRegister, handlers.soundRegister(soundManager))
  messenger.handleAction(soundRead.REQUEST, soundRead, handlers.soundRead(soundManager))
  messenger.handleAction(stories.REQUEST, stories, handlers.listStories(storyManager))
  messenger.handleAction(storyCreate.REQUEST, storyCreate, handlers.saveStory(storyManager))

  // TODO: Handle sound load
  // TODO: Handle sound unload
  // TODO: Handle sound play
  // TODO: Handle sound stop
  // TODO: Handle sound volume change
  // TODO: Handle sound mute
  // TODO: Handle sound unmute

  mainWindow.removeMenu()
  mainWindow.setMenuBarVisibility(false)
  mainWindow.setFullScreenable(true)

  if (development) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  return mainWindow
}
