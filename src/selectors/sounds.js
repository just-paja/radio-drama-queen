import { createSelector } from 'reselect';

const memoizeSound = (state, uuid) => state.soundList.find(sound => sound.uuid === uuid);

export const getSound = createSelector(
  memoizeSound,
  item => item
);

export const getSoundCategory = createSelector(
  [memoizeSound, state => state.categoryList],
  (sound, categoryList) => categoryList.find(
    category => category.sounds.indexOf(sound.uuid) !== -1
  )
);

export const getSoundPlayingStatus = createSelector(
  memoizeSound,
  sound => sound.playing
);
