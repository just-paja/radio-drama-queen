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

export const getCategory = createSelector(
  memoizeCategory,
  category => category
);

export const getCategoryName = createSelector(
  memoizeCategory,
  category => category.name
);

export const getCategorySoundUuids = createSelector(
  memoizeCategory,
  category => category.sounds
);

export const getCategorySounds = createSelector(
  [memoizeCategory, state => state.soundList],
  (category, soundList) => soundList.filter(
    sound => category.sounds.indexOf(sound.uuid) !== -1
  )
);

export const getCategoryLoopStatus = createSelector(
  memoizeCategory,
  category => category.loop
);

export const getCategoryMutedStatus = createSelector(
  memoizeCategory,
  category => category.muted
);

export const getCategoryExclusiveStatus = createSelector(
  memoizeCategory,
  category => category.exclusive
);

export const getCategorySoundPlayingUuids = createSelector(
  [memoizeCategory, state => state.soundList],
  (category, allSounds) => category.sounds
    .filter((uuid) => {
      const sound = allSounds.find(filterSound => filterSound.uuid === uuid);
      return sound && sound.playing;
    })
);

export const getCategoryPlayingStatus = createSelector(
  [memoizeCategory, state => state.soundList],
  (category, allSounds) => allSounds
    .filter(sound => category.sounds.indexOf(sound.uuid) !== -1)
    .some(sound => sound.playing)
);

export const getCategoryVolume = createSelector(
  memoizeCategory,
  category => category.volume
);
