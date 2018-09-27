import { createSelector } from 'reselect';
import { getFlag } from 'react-saga-rest';

import { clearSearch, splitSearchPatterns, stringSearch } from '../../search';
import { getSound, memoizeSoundList } from '../../sounds/selectors';
import { getTags } from '../../tags/selectors';
import { getCategories } from '../../soundCategories/selectors';

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

const isRelevant = (item, search, inclusive = false) => (
  stringSearch(item.name, search, inclusive).relevant
  || hasRelevantTitle(item, search)
);

const hasRelevantTags = (sound, relevantTags) => relevantTags
  && sound.tags
  && relevantTags.every(
    tagGroup => tagGroup.some(
      tag => sound.tags.indexOf(tag) !== -1
    )
  );

const getRelevantTags = (tags, search) => {
  const searchSplit = splitSearchPatterns(search);
  return searchSplit.map(pattern => tags
    .filter(tag => isRelevant(tag, pattern))
    .map(tag => tag.name));
};

export const getGallerySoundListFiltered = createSelector(
  [memoizeSoundList, getCategories],
  (sounds, categories) => sounds.map(sound => ({
    ...sound,
    isUsed: categories.some(category => category.sounds.indexOf(sound.uuid) !== -1),
  }))
);

export const getUsedFilter = getFlag(memoizeSearch, 'filterUsed');

export const getGallerySoundList = createSelector(
  [
    getGallerySoundListFiltered,
    getTags,
    getSoundSearchValueCleared,
    getUsedFilter,
  ],
  (sounds, tags, search, filterUsed) => {
    let soundsFiltered = sounds;
    if (filterUsed) {
      soundsFiltered = soundsFiltered.filter(sound => !sound.isUsed);
    }
    if (search) {
      const relevantTags = getRelevantTags(tags, search);
      soundsFiltered = soundsFiltered
        .filter(sound => isRelevant(sound, search) || hasRelevantTags(sound, relevantTags));
    }
    return soundsFiltered.slice(0, 20);
  }
);

export const getGallerySound = createSelector(
  getSound,
  state => state
);
