import { createSelector } from 'reselect';

const getFeatureState = state => state.tags;

export const getTagByName = createSelector(
  (state, name) => getFeatureState(state).find(tag => tag.name === name),
  tag => tag
);

export const getTags = createSelector(getFeatureState, state => state);
