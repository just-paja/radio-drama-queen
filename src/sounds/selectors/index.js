import { createSelector } from 'reselect'
import { getFlag } from 'react-saga-rest'
import { soundStore } from '../store'

export const getSoundPlayingStatus = getFlag(soundStore.getObject, 'playing')
export const getSoundLoopStatus = getFlag(soundStore.getObject, 'loop')

export const getPlayingSounds = createSelector(
  soundStore.getAll,
  sounds => sounds.filter(sound => sound.playing)
)

export const getPlayingSoundsUuids = createSelector(
  getPlayingSounds,
  sounds => sounds.map(sound => sound.uuid)
)

export const isAnySoundPlaying = createSelector(
  getPlayingSounds,
  sounds => sounds.length > 0
)
