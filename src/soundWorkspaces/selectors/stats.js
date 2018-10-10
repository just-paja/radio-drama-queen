import { createSelector } from 'reselect';

import { getCategories } from '../../soundCategories/selectors';
import { getTags } from '../../soundTags/selectors';
import { memoizeSoundList } from '../../sounds/selectors';

const countFlags = (selector, flag) => createSelector(
  selector,
  items => items.filter(item => item[flag]).length
);

export const countMemorySounds = countFlags(memoizeSoundList, 'valid');
export const countErrorSounds = countFlags(memoizeSoundList, 'error');
export const countPlayingSounds = countFlags(memoizeSoundList, 'playing');

export const countBoardSounds = createSelector(
  [memoizeSoundList, getCategories],
  (sounds, categories) => sounds.filter(
    sound => categories.some(
      category => category.sounds.indexOf(sound.uuid) !== -1
    )
  ).length
);

export const countTags = createSelector(
  getTags,
  tags => tags.length
);
