import { createSelector } from 'reselect';

const memoizeCategory = (state, uuid) => state.categoryList.find(
  category => category.uuid === uuid
);

export const getDefaultCategory = createSelector(
  state => state.categoryList,
  categoryList => categoryList.find(category => category.name === null)
);

export const getCategoryListUuids = createSelector(
  state => state.categoryList,
  list => list.map(category => category.uuid)
);

export const getCategoryName = createSelector(
  memoizeCategory,
  category => category.name
);

export const getCategorySoundUuids = createSelector(
  memoizeCategory,
  category => category.sounds
);

export const getCategoryLoopStatus = createSelector(
  memoizeCategory,
  category => category.loop
);

export const getCategoryPlayingStatus = createSelector(
  [memoizeCategory, state => state.soundList],
  (category, allSounds) => allSounds
    .filter(sound => category.sounds.indexOf(sound.uuid) !== -1)
    .some(sound => sound.playing)
);
