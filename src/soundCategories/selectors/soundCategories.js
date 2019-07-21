import { createSelector } from 'reselect'

import { soundStore } from '../../sounds'
import { categoryStore } from '../store'

export const getCategoriesWithStatus = createSelector(
  [categoryStore.getAll, soundStore.getAll],
  (categories, sounds) => categories.map(category => ({
    ...category,
    playing: category.sounds.some(soundUuid => sounds.find(sound => (
      sound.uuid === soundUuid &&
      sound.playing
    )))
  }))
)

export const getCategoryListUuids = createSelector(
  categoryStore.getAll,
  list => list.map(category => category.uuid)
)

export const getCategory = createSelector(
  categoryStore.getObject,
  category => category
)

export const getCategoryByName = createSelector(
  (state, name) => categoryStore.getAll(state).find(
    category => category.name === name
  ),
  category => category
)

export const getCategoryBoardUuid = createSelector(
  categoryStore.getObject,
  category => category.board
)

export const getCategorySoundUuids = createSelector(
  categoryStore.getObject,
  category => category.sounds
)

export const getCategorySounds = createSelector(
  [categoryStore.getObject, soundStore.getAll],
  (category, soundList) => soundList.filter(
    sound => category.sounds.indexOf(sound.uuid) !== -1
  )
)

export const getCategoryEditStatus = createSelector(
  categoryStore.getObject,
  category => category.edit
)

export const getCategoryLoopStatus = createSelector(
  categoryStore.getObject,
  category => category.loop
)

export const getCategoryMutedStatus = createSelector(
  categoryStore.getObject,
  category => category.muted
)

export const getCategoryExclusiveStatus = createSelector(
  categoryStore.getObject,
  category => category.exclusive
)

export const getCategorySoundPlayingUuids = createSelector(
  [categoryStore.getObject, soundStore.getAll],
  (category, allSounds) => category.sounds
    .filter((uuid) => {
      const sound = allSounds.find(filterSound => filterSound.uuid === uuid)
      return sound && sound.playing
    })
)

export const getCategoryPlayingStatus = createSelector(
  [categoryStore.getObject, soundStore.getAll],
  (category, allSounds) => allSounds
    .filter(sound => category.sounds.indexOf(sound.uuid) !== -1)
    .some(sound => sound.playing)
)

export const getCategoryVolume = createSelector(
  categoryStore.getObject,
  category => category.volume
)

export const getSoundCategories = createSelector(
  (state, soundUuid) => categoryStore.getAll(state)
    .filter(category => category.sounds.indexOf(soundUuid) !== -1),
  state => state
)

export const getAllUnusedSoundsByTag = createSelector(
  [
    (state, tag) => soundStore.getAll(state)
      .filter(sound => sound.tags && sound.tags.indexOf(tag) !== -1),
    categoryStore.getAll
  ],
  (sounds, categories) => sounds.filter(
    sound => !categories.find(category => category.sounds.indexOf(sound.uuid) !== -1)
  )
)

export const isSoundUsed = createSelector(
  [categoryStore.getAll, (state, soundUuid) => soundUuid],
  (categories, soundUuid) => categories.some(category => category.sounds.indexOf(soundUuid) !== -1)
)
