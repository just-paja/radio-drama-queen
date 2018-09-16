import { createSelector } from 'reselect';

export const memoizeSoundList = state => state.sounds.list;

const memoizeSound = (state, uuid) => memoizeSoundList(state).find(sound => sound.uuid === uuid);

export const getSound = createSelector(
  memoizeSound,
  item => item
);

export const getSoundByUrl = createSelector(
  (state, url) => memoizeSoundList(state).find(sound => sound.path === url),
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

export const getSoundLoopStatus = createSelector(
  memoizeSound,
  sound => sound.loop
);
