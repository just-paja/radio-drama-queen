import { createSelector } from 'reselect';

import { clearSearch, stringSearch } from '../../search';
import { getSound, memoizeSoundList } from '../../sounds/selectors';
import { getTags } from '../../tags/selectors';

const memoizeSearch = state => state.soundGallery.search;

export const getSoundSearchValue = createSelector(
  memoizeSearch,
  state => state.search
);

export const getGallerySize = createSelector(
  memoizeSoundList,
  state => state.length
);

export const getSoundSearchValueCleared = createSelector(
  getSoundSearchValue,
  value => clearSearch(value)
);

const hasRelevantTitle = (item, search) => Boolean(item.title)
  && Object.keys(item.title).some(key => stringSearch(item.title[key], search).relevant);

const isRelevant = (item, search) => (
  stringSearch(item.name, search).relevant
  || hasRelevantTitle(item, search)
);

const hasRelevantTag = (sound, relevantTags) => sound.tags
  && sound.tags.some(tag => relevantTags.indexOf(tag) !== -1);

export const getGallerySoundList = createSelector(
  [memoizeSoundList, getTags, getSoundSearchValueCleared],
  (sounds, tags, search) => {
    if (search) {
      const relevantTags = tags
        .filter(tag => isRelevant(tag, search))
        .map(tag => tag.name);
      return sounds
        .filter(sound => isRelevant(sound, search) || hasRelevantTag(sound, relevantTags))
        .slice(0, 20);
    }
    return sounds.slice(0, 20);
  }
);

export const getGallerySound = createSelector(
  getSound,
  state => state
);
