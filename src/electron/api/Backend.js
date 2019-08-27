const BackendMessenger = require('./BackendMessenger')
const handlers = require('../handlers')
const jetpack = require('fs-jetpack')
const workerpool = require('workerpool')

const { categoryRoutines } = require('../../soundCategories/actions')
const { boardRoutines } = require('../../soundBoards/actions')
const { configureBackendStore } = require('./store')
const { libraryRoutines } = require('../../soundLibraries/actions')
const { moduleRoutines } = require('../../soundModules/actions')
const { PATH_WORKERS } = require('../paths')
const { soundRoutines } = require('../../sounds/actions')
const { storyRoutines } = require('../../soundStories/actions')
const { workspaceRoutines } = require('../../soundWorkspaces/actions')

export class Backend {
  constructor (mainWindow, development) {
    this.mainWindow = mainWindow
    this.development = development
    this.config = {}
  }

  get state () {
    return this.store.getState()
  }

  start () {
    this.configure()
    this.connectStore()
    this.connectMessenger()
    this.connectWorkers()
    this.connectActions()
  }

  configure () {
    const home = jetpack.path(process.env.HOME, '.config', 'radio-drama-queen')
    this.config = {
      paths: {
        cache: jetpack.path(home, 'Cache'),
        home,
        stories: jetpack.path(home, 'Stories')
      }
    }
  }

  connectStore () {
    this.store = configureBackendStore()
  }

  connectMessenger () {
    this.messenger = new BackendMessenger(this)
  }

  connectWorkers () {
    this.workerPool = workerpool.pool(PATH_WORKERS)
  }

  connectActions () {
    this.messenger.handleAction(boardRoutines.create, handlers.createBoard)
    this.messenger.handleAction(boardRoutines.remove, handlers.removeBoard)
    this.messenger.handleAction(boardRoutines.rename, handlers.renameBoard)
    this.messenger.handleAction(categoryRoutines.create, handlers.createCategory)
    this.messenger.handleAction(categoryRoutines.remove, handlers.removeCategory)
    this.messenger.handleAction(categoryRoutines.rename, handlers.renameCategory)
    this.messenger.handleAction(categoryRoutines.setVolume, handlers.setCategoryVolume)
    this.messenger.handleAction(categoryRoutines.soundAdd, handlers.addSoundToCategory)
    this.messenger.handleAction(categoryRoutines.soundRemove, handlers.removeSoundFromCategory)
    this.messenger.handleAction(categoryRoutines.toggleExclusive, handlers.toggleCategoryExclusive)
    this.messenger.handleAction(categoryRoutines.toggleLoop, handlers.toggleCategoryLoop)
    this.messenger.handleAction(categoryRoutines.toggleMute, handlers.toggleCategoryMute)
    this.messenger.handleAction(categoryRoutines.unmute, handlers.unmuteCategory)
    this.messenger.handleAction(libraryRoutines.load, handlers.loadLibrary)
    this.messenger.handleAction(moduleRoutines.load, handlers.loadModule)
    this.messenger.handleAction(soundRoutines.edit, handlers.soundEdit)
    this.messenger.handleAction(soundRoutines.read, handlers.soundRead)
    this.messenger.handleAction(soundRoutines.register, handlers.soundRegister)
    this.messenger.handleAction(storyRoutines.create, handlers.saveStory)
    this.messenger.handleAction(storyRoutines.list, handlers.listStories)
    this.messenger.handleAction(storyRoutines.load, handlers.loadStory)
    this.messenger.handleAction(storyRoutines.remove, handlers.removeStory)
    this.messenger.handleAction(storyRoutines.rename, handlers.renameStory)
    this.messenger.handleAction(storyRoutines.save, handlers.saveStory)
    this.messenger.handleAction(workspaceRoutines.load, handlers.getState)
  }

  dispatch (action) {
    return this.handleIncomingAction(action)
  }

  handleIncomingAction (action) {
    return this.messenger.handleIncomingAction(action)
  }

  terminate () {
    this.workerPool.terminate()
  }

  workOn (workerName, payload) {
    return this.workerPool.exec(workerName, [this.config, payload])
  }
}

export function startBackend (mainWindow, development) {
  const app = new Backend(mainWindow, development)
  app.start()
  return app
}
