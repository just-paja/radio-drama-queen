import { SoundManager } from './SoundManager'

const { BrowserWindow } = require('electron')

const BackendMessenger = require('./BackendMessenger')
const handlers = require('./handlers')

const { libraryRoutines } = require('../soundLibraries/actions')
const { moduleRoutines } = require('../soundModules/actions')
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

  messenger.handleAction(libraryRoutines.load, handlers.loadLibrary)
  messenger.handleAction(moduleRoutines.load, handlers.loadModule)
  messenger.handleAction(soundRoutines.edit, handlers.soundEdit(soundManager))
  messenger.handleAction(soundRoutines.read, handlers.soundRead(soundManager))
  messenger.handleAction(soundRoutines.register, handlers.soundRegister(soundManager))
  messenger.handleAction(storyRoutines.create, handlers.saveStory)
  messenger.handleAction(storyRoutines.list, handlers.listStories)
  messenger.handleAction(storyRoutines.load, handlers.loadStory)
  messenger.handleAction(storyRoutines.remove, handlers.removeStory)
  messenger.handleAction(storyRoutines.rename, handlers.renameStory)
  messenger.handleAction(storyRoutines.save, handlers.saveStory)

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
