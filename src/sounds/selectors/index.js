import { createSelector } from 'reselect'
import { soundStore } from '../store'

export const getPlayingSounds = createSelector(
  soundStore.getAll,
  sounds => sounds.filter(sound => sound.playing)
)

export const countPlayingSounds = createSelector(
  getPlayingSounds,
  sounds => sounds.length
)
