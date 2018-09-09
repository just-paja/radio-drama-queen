import { createSelector } from 'reselect';

import { clearSearch } from '../search';

const getFeatureState = state => state.soundSearch;

export const getSoundSearchValue = createSelector(
  getFeatureState,
  state => state.search
);

export const getSoundSearchValueCleared = createSelector(
  getSoundSearchValue,
  value => clearSearch(value)
);
