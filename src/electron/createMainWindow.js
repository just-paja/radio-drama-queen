import { SoundManager } from './SoundManager'
import { StoryManager } from './StoryManager'

const { BrowserWindow } = require('electron')

const BackendMessenger = require('./BackendMessenger')
const handlers = require('./handlers')

const { soundRoutines } = require('../sounds/actions')
const { storyRoutines } = require('../soundStories/actions')

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

  messenger.handleAction(soundRoutines.edit, handlers.soundEdit(soundManager))
  messenger.handleAction(soundRoutines.read, handlers.soundRead(soundManager))
  messenger.handleAction(soundRoutines.register, handlers.soundRegister(soundManager))
  messenger.handleAction(storyRoutines.create, handlers.saveStory(storyManager))
  messenger.handleAction(storyRoutines.list, handlers.listStories(storyManager))
  messenger.handleAction(storyRoutines.load, handlers.loadStory(storyManager))
  messenger.handleAction(storyRoutines.remove, handlers.removeStory(storyManager))
  messenger.handleAction(storyRoutines.rename, handlers.renameStory(storyManager))
  messenger.handleAction(storyRoutines.save, handlers.saveStory(storyManager))

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

  // eslint-disable-next-line no-undef
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  return mainWindow
}
