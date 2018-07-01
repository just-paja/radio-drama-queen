import { createSelector } from 'reselect';

const memoizeSound = (state, uuid) => state.soundList.find(sound => sound.uuid === uuid);

export const getSound = createSelector(
  memoizeSound,
  item => item
);

export const getSoundPlayingStatus = createSelector(
  memoizeSound,
  sound => sound.playing
);
