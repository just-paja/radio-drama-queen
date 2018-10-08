import { createSelector } from 'reselect';
import { getFlag } from 'react-saga-rest';

export const memoizeSoundList = state => state.sounds.list;

const memoizeSound = (state, uuid) => memoizeSoundList(state).find(sound => sound.uuid === uuid);

export const getSound = createSelector(
  memoizeSound,
  item => item
);

export const getSoundPlayingStatus = getFlag(memoizeSound, 'playing');
export const getSoundLoopStatus = getFlag(memoizeSound, 'loop');

export const getPlayingSounds = createSelector(
  memoizeSoundList,
  sounds => sounds.filter(sound => sound.playing)
);

export const isAnySoundPlaying = createSelector(
  getPlayingSounds,
  sounds => sounds.length > 0
);
