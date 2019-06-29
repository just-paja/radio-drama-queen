import { createSelector } from 'reselect'

import { categoryStore } from '../../soundCategories'
import { soundStore } from '../../sounds'
import { tagStore } from '../../soundTags'

const countFlags = (selector, flag) => createSelector(
  selector,
  items => items.filter(item => item[flag]).length
)

export const countMemorySounds = countFlags(soundStore.getAll, 'valid')
export const countErrorSounds = countFlags(soundStore.getAll, 'error')
export const countPlayingSounds = countFlags(soundStore.getAll, 'playing')

export const countBoardSounds = createSelector(
  [soundStore.getAll, categoryStore.getAll],
  (sounds, categories) => sounds.filter(
    sound => categories.some(
      category => category.sounds.indexOf(sound.uuid) !== -1
    )
  ).length
)

export const countTags = createSelector(
  tagStore.getAll,
  tags => tags.length
)
