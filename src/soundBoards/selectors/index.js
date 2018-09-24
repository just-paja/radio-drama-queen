import { createSelector } from 'reselect';

import { getCategoryListUuids } from '../../soundCategories/selectors';

const memoizeBoardList = state => state.soundBoards.list;
const memoizeUi = state => state.soundBoards.ui;

export const getBoards = createSelector(
  memoizeBoardList,
  list => list
);

export const getBoardCategoryUuids = createSelector(
  (state, boardUuid) => getCategoryListUuids(state)
    .filter(category => category.board === boardUuid),
  categories => categories
);

export const isCategoryCreateFormVisible = createSelector(
  memoizeUi,
  state => state.showCreateForm
);
