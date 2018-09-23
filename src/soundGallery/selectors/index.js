import { createSelector } from 'reselect';

import { getSound, memoizeSoundList } from '../../sounds/selectors';

export const getGallerySoundListPaged = createSelector(
  memoizeSoundList,
  state => state.slice(0, 20)
);

export const getGallerySoundList = createSelector(getGallerySoundListPaged, state => state);

export const getGallerySound = createSelector(
  getSound,
  state => state
);
