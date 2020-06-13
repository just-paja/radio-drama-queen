import { categoryStore } from '../../soundCategories/store'
import { generateUuid } from '../uuid'
import { getLargestNameNumber } from './naming'
import { soundStore } from '../../sounds/store'

export async function createCategory (app, action) {
  const uuid = generateUuid()
  await app.createPlaybackWindow(uuid, action.board)
  const maxNumber = getLargestNameNumber(categoryStore.getAll(app.state))
  return Promise.resolve({
    name: `Unnamed ${maxNumber + 1}`,
    sounds: [],
    uuid,
    ...action.payload
  })
}

function returnCategory (app, action) {
  return Promise.resolve(
    categoryStore.getObject(app.state, action.payload.uuid || action.payload)
  )
}

export function addSoundToCategory (app, action) {
  const sound = soundStore.getObject(app.state, action.payload.sound)
  return app
    .getPlaybackWindow(action.payload.uuid)
    .soundAdd(sound.cachePath)
    .then(response => ({
      uuid: action.payload.uuid,
      sound: sound.cachePath
    }))
}

export function removeCategory (app, action) {
  app.removePlaybackWindow(action.payload)
  return returnCategory(app, action)
}

function windowAction (actionName) {
  return function (app, action) {
    const window = app.getPlaybackWindow(action.payload)
    if (window) {
      return window[actionName]()
    }
  }
}

export const categoryExclusiveOff = windowAction('setExclusiveOff')
export const categoryExclusiveOn = windowAction('setExclusiveOn')
export const categoryLoopOff = windowAction('setLoopOff')
export const categoryLoopOn = windowAction('setLoopOn')
export const muteCategory = windowAction('setMuteOn')
export const removeSoundFromCategory = windowAction('setMuteOff')
export const renameCategory = returnCategory
export const setCategoryVolume = windowAction('setVolume')
export const unmuteCategory = windowAction('setMuteOff')
