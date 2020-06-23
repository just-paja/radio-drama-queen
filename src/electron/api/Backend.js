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
const { uiRoutines } = require('../../ui/actions')
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
    const msg = this.messenger
    msg.handleRequest(boardRoutines.create, handlers.createBoard)
    msg.handleRequest(boardRoutines.remove, handlers.removeBoard)
    msg.handleRequest(boardRoutines.rename, handlers.renameBoard)
    msg.handleRequest(categoryRoutines.create, handlers.createCategory)
    msg.handleRequest(
      categoryRoutines.exclusiveOff,
      handlers.categoryExclusiveOff
    )
    msg.handleRequest(
      categoryRoutines.exclusiveOn,
      handlers.categoryExclusiveOn
    )
    msg.handleRequest(categoryRoutines.loopOff, handlers.categoryLoopOff)
    msg.handleRequest(categoryRoutines.loopOn, handlers.categoryLoopOn)
    msg.handleRequest(categoryRoutines.mute, handlers.muteCategory)
    msg.handleRequest(categoryRoutines.remove, handlers.removeCategory)
    msg.handleRequest(categoryRoutines.rename, handlers.renameCategory)
    msg.handleRequest(categoryRoutines.setVolume, handlers.setCategoryVolume)
    msg.handleRequest(categoryRoutines.soundAdd, handlers.addSoundToCategory)
    msg.handleRequest(
      categoryRoutines.soundRemove,
      handlers.removeSoundFromCategory
    )
    msg.handleRequest(categoryRoutines.unmute, handlers.unmuteCategory)
    msg.handleRequest(libraryRoutines.load, handlers.loadLibrary)
    msg.handleRequest(moduleRoutines.load, handlers.loadModule)
    msg.handleRequest(soundRoutines.edit, handlers.soundEdit)
    msg.handleRequest(soundRoutines.play, handlers.soundPlay)
    msg.handleRequest(soundRoutines.stop, handlers.soundStop)
    msg.handleRequest(soundRoutines.read, handlers.soundRead)
    msg.handleRequest(soundRoutines.register, handlers.soundRegister)
    msg.handleRequest(storyRoutines.create, handlers.saveStory)
    msg.handleRequest(storyRoutines.list, handlers.listStories)
    msg.handleRequest(storyRoutines.load, handlers.loadStory)
    msg.handleRequest(storyRoutines.remove, handlers.removeStory)
    msg.handleRequest(storyRoutines.rename, handlers.renameStory)
    msg.handleRequest(storyRoutines.save, handlers.saveStory)
    msg.handleRequest(storyRoutines.update, handlers.updateStory)
    msg.handleRequest(workspaceRoutines.load, handlers.getState)
    msg.handleRequest(uiRoutines.init, handlers.sendState)
  }

  createPlaybackWindow (category, board) {
    this.playbackWindows[category] = new PlaybackWindow(this, category, board)
    return this.playbackWindows[category].openWindow()
  }

  getPlaybackWindow (category) {
    return this.playbackWindows[category]
  }

  removePlaybackWindow (category) {
    this.playbackWindows[category].closeWindow()
    this.playbackWindows = Object.entries(this.playbackWindows)
      .filter(([key, value]) => value && key !== category)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
  }

  dispatch (action) {
    return this.handleIncomingAction(action)
  }

  handleIncomingAction (action) {
    return this.messenger.handleIncomingAction(action)
  }

  terminate () {
    this.workerPool.terminate()
    Object.keys(this.playbackWindows).forEach(categoryUuid => {
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
