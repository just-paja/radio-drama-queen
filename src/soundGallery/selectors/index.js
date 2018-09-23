import { createSelector } from 'reselect';

import { memoizeSoundList } from '../../sounds/selectors';

export const getGallerySoundListPaged = createSelector(
  memoizeSoundList,
  state => state.slice(0, 20)
);

export const getGallerySoundList = createSelector(getGallerySoundListPaged, state => state);

export default { getGallerySoundList };
