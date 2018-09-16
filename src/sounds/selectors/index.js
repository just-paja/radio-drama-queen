import { createSelector } from 'reselect';

const memoizeList = state => state.sounds.list;

const memoizeSound = (state, uuid) => memoizeList(state).find(sound => sound.uuid === uuid);

export const getSound = createSelector(
  memoizeSound,
  item => item
);

export const getSoundByUrl = createSelector(
  (state, url) => memoizeList(state).find(sound => sound.path === url),
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
