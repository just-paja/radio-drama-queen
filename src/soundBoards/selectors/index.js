import { createSelector } from 'reselect';

import { getCategories } from '../../soundCategories/selectors';

const memoizeBoardList = state => state.soundBoards.list;
const memoizeUi = state => state.soundBoards.ui;

export const getBoards = createSelector(
  memoizeBoardList,
  list => list
);

export const getBoard = createSelector(
  (state, boardUuid) => getBoards(state)
    .find(board => board.uuid === boardUuid),
  board => board
);

export const getBoardCategories = createSelector(
  (state, boardUuid) => getCategories(state)
    .filter(category => category.board === boardUuid),
  categories => categories
);

export const getBoardCategoryUuids = createSelector(
  getBoardCategories,
  categories => categories.map(category => category.uuid)
);

export const getBoardDefaultCategory = createSelector(
  getBoardCategories,
  categories => categories.find(category => category.name === null)
);

export const getBoardCategoryOldest = createSelector(
  getBoardCategories,
  categories => categories[0]
);

export const getBoardTargetCategory = createSelector(
  [getBoardDefaultCategory, getBoardCategoryOldest],
  (defaultCategory, oldestCategory) => defaultCategory || oldestCategory
);

export const isCategoryCreateFormVisible = createSelector(
  memoizeUi,
  state => state.showCreateForm
);
