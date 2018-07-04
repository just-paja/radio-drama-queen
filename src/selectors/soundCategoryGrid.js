import { createSelector } from 'reselect';

const memoizeGridState = state => state.categoryGrid;

export const isCategoryCreateFormVisible = createSelector(
  memoizeGridState,
  state => state.showCreateForm
);

export default { isCategoryCreateFormVisible };
