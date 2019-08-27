import generateUuid from 'uuid/v4'

import { categoryStore } from '../../soundCategories/store'
import { getLargestNameNumber } from './naming'

export function createCategory (app, action) {
  const maxNumber = getLargestNameNumber(categoryStore.getAll(app.state))
  return Promise.resolve({
    name: `Unnamed ${maxNumber + 1}`,
    sounds: [],
    ...action.payload,
    uuid: generateUuid()
  })
}

function returnCategory (app, action) {
  return Promise.resolve(categoryStore.getObject(app.state, action.payload.uuid || action.payload))
}

export const addSoundToCategory = returnCategory
export const categoryExclusiveOff = returnCategory
export const categoryExclusiveOn = returnCategory
export const categoryLoopOff = returnCategory
export const categoryLoopOn = returnCategory
export const muteCategory = returnCategory
export const removeCategory = returnCategory
export const removeSoundFromCategory = returnCategory
export const renameCategory = returnCategory
export const setCategoryVolume = returnCategory
export const unmuteCategory = returnCategory
