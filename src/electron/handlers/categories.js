import { categoryStore } from '../../soundCategories/store'
import { generateUuid } from '../uuid'
import { getLargestNameNumber } from './naming'
import { soundStore } from '../../sounds/store'

export async function createCategory (app, action) {
  const uuid = generateUuid()
  await app.createPlaybackWindow(uuid)
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
  // TODO: Sound add should switch to use cachePath instead of uuid
  const sound = soundStore.getObject(app.state, action.payload.sound)
  return app
    .getPlaybackWindow(action.payload.uuid)
    .soundAdd(sound.cachePath)
    .then(response => ({
      uuid: action.payload.uuid,
      sound: sound.uuid
    }))
}

export function removeCategory (app, action) {
  app.removePlaybackWindow(action.payload)
  return returnCategory(app, action)
}

export const categoryExclusiveOff = returnCategory
export const categoryExclusiveOn = returnCategory
export const categoryLoopOff = returnCategory
export const categoryLoopOn = returnCategory
export const muteCategory = returnCategory
export const removeSoundFromCategory = returnCategory
export const renameCategory = returnCategory
export const setCategoryVolume = returnCategory
export const unmuteCategory = returnCategory
