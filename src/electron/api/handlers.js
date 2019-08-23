const BackendMessenger = require('./BackendMessenger')
const handlers = require('../handlers')
const workerpool = require('workerpool')

const { boardRoutines } = require('../../soundBoards/actions')
const { configureBackendStore } = require('./store')
const { libraryRoutines } = require('../../soundLibraries/actions')
const { moduleRoutines } = require('../../soundModules/actions')
const { PATH_WORKERS } = require('../paths')
const { soundRoutines } = require('../../sounds/actions')
const { storyRoutines } = require('../../soundStories/actions')

export function configureApi (window, development) {
  const store = configureBackendStore()
  const pool = workerpool.pool(PATH_WORKERS)
  const messenger = new BackendMessenger(
    window,
    store,
    pool,
    development
  )

  messenger.handleAction(boardRoutines.create, handlers.createBoard)
  messenger.handleAction(boardRoutines.remove, handlers.removeBoard)
  messenger.handleAction(boardRoutines.rename, handlers.renameBoard)
  messenger.handleAction(libraryRoutines.load, handlers.loadLibrary)
  messenger.handleAction(moduleRoutines.load, handlers.loadModule)
  messenger.handleAction(soundRoutines.edit, handlers.soundEdit)
  messenger.handleAction(soundRoutines.read, handlers.soundRead)
  messenger.handleAction(soundRoutines.register, handlers.soundRegister)
  messenger.handleAction(storyRoutines.create, handlers.saveStory)
  messenger.handleAction(storyRoutines.list, handlers.listStories)
  messenger.handleAction(storyRoutines.load, handlers.loadStory)
  messenger.handleAction(storyRoutines.remove, handlers.removeStory)
  messenger.handleAction(storyRoutines.rename, handlers.renameStory)
  messenger.handleAction(storyRoutines.save, handlers.saveStory)

  return messenger
}
