const BackendMessenger = require('./BackendMessenger')
const handlers = require('../handlers')
const jetpack = require('fs-jetpack')
const workerpool = require('workerpool')

const { boardRoutines } = require('../../soundBoards/actions')
const { categoryRoutines } = require('../../soundCategories/actions')
const { configureBackendStore } = require('./store')
const { libraryRoutines } = require('../../soundLibraries/actions')
const { moduleRoutines } = require('../../soundModules/actions')
const { PATH_WORKERS } = require('../paths')
const { PlaybackWindow } = require('./PlaybackWindow')
const { soundRoutines } = require('../../sounds/actions')
const { storyRoutines } = require('../../soundStories/actions')
const { workspaceRoutines } = require('../../soundWorkspaces/actions')

export class Backend {
  constructor (mainWindow, development) {
    this.config = {}
    this.development = development
    this.mainWindow = mainWindow
    this.playbackWindows = {}
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
    this.messenger.handleRequest(boardRoutines.create, handlers.createBoard)
    this.messenger.handleRequest(boardRoutines.remove, handlers.removeBoard)
    this.messenger.handleRequest(boardRoutines.rename, handlers.renameBoard)
    this.messenger.handleRequest(categoryRoutines.create, handlers.createCategory)
    this.messenger.handleRequest(categoryRoutines.exclusiveOff, handlers.categoryExclusiveOff)
    this.messenger.handleRequest(categoryRoutines.exclusiveOn, handlers.categoryExclusiveOn)
    this.messenger.handleRequest(categoryRoutines.loopOff, handlers.categoryLoopOff)
    this.messenger.handleRequest(categoryRoutines.loopOn, handlers.categoryLoopOn)
    this.messenger.handleRequest(categoryRoutines.mute, handlers.muteCategory)
    this.messenger.handleRequest(categoryRoutines.remove, handlers.removeCategory)
    this.messenger.handleRequest(categoryRoutines.rename, handlers.renameCategory)
    this.messenger.handleRequest(categoryRoutines.setVolume, handlers.setCategoryVolume)
    this.messenger.handleRequest(categoryRoutines.soundAdd, handlers.addSoundToCategory)
    this.messenger.handleRequest(categoryRoutines.soundRemove, handlers.removeSoundFromCategory)
    this.messenger.handleRequest(categoryRoutines.unmute, handlers.unmuteCategory)
    this.messenger.handleRequest(libraryRoutines.load, handlers.loadLibrary)
    this.messenger.handleRequest(moduleRoutines.load, handlers.loadModule)
    this.messenger.handleRequest(soundRoutines.edit, handlers.soundEdit)
    this.messenger.handleRequest(soundRoutines.play, handlers.soundPlay)
    this.messenger.handleRequest(soundRoutines.read, handlers.soundRead)
    this.messenger.handleRequest(soundRoutines.register, handlers.soundRegister)
    this.messenger.handleRequest(storyRoutines.create, handlers.saveStory)
    this.messenger.handleRequest(storyRoutines.list, handlers.listStories)
    this.messenger.handleRequest(storyRoutines.load, handlers.loadStory)
    this.messenger.handleRequest(storyRoutines.remove, handlers.removeStory)
    this.messenger.handleRequest(storyRoutines.rename, handlers.renameStory)
    this.messenger.handleRequest(storyRoutines.save, handlers.saveStory)
    this.messenger.handleRequest(workspaceRoutines.load, handlers.getState)
  }

  createPlaybackWindow (category) {
    this.playbackWindows[category] = new PlaybackWindow(this, category)
    return this.playbackWindows[category].openWindow()
  }

  getPlaybackWindow (category) {
    return this.playbackWindows[category]
  }

  removePlaybackWindow (category) {
    this.playbackWindows[category].closeWindow()
    this.playbackWindows[category] = null
  }

  dispatch (action) {
    return this.handleIncomingAction(action)
  }

  handleIncomingAction (action) {
    return this.messenger.handleIncomingAction(action)
  }

  terminate () {
    this.workerPool.terminate()
    Object.keys(this.playbackWindows).forEach((categoryUuid) => {
      if (this.playbackWindows[categoryUuid]) {
        this.playbackWindows[categoryUuid].closeWindow()
        this.playbackWindows[categoryUuid] = null
      }
    })
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
