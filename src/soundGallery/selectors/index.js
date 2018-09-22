import { createSelector } from 'reselect';

import { memoizeSoundList } from '../../sounds/selectors';

export const getGallerySoundList = createSelector(memoizeSoundList, state => state);

export default { getGallerySoundList };
