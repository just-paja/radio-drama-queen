import { createSelector } from 'reselect';

import { clearSearch, stringSearch } from '../../search';
import { getSound, memoizeSoundList } from '../../sounds/selectors';

const memoizeSearch = state => state.soundGallery.search;

export const getSoundSearchValue = createSelector(
  memoizeSearch,
  state => state.search
);

export const getSoundSearchValueCleared = createSelector(
  getSoundSearchValue,
  value => clearSearch(value)
);

export const getGallerySoundList = createSelector(
  [memoizeSoundList, getSoundSearchValueCleared],
  (sounds, search) => {
    if (search) {
      return sounds
        .filter(sound => stringSearch(sound.name, search).relevant);
    }
    return sounds.slice(0, 20);
  }
);

export const getGallerySound = createSelector(
  getSound,
  state => state
);
