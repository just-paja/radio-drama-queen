import { createSelector } from 'reselect';

const getFeatureState = state => state.soundSearch;

export const getSoundSearchValue = createSelector(
  getFeatureState,
  state => state.search
);

export default { getSoundSearchValue };
