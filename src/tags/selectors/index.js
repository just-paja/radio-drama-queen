import { createSelector } from 'reselect';

const memoizeTagList = state => state.tags.list;

export const getTagByName = createSelector(
  (state, name) => memoizeTagList(state).find(tag => tag.name === name),
  tag => tag
);

export const getTags = createSelector(memoizeTagList, state => state);
