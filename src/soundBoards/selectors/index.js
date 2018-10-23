import { getFlag } from 'react-saga-rest';
import { createSelector } from 'reselect';

import {
  getCategories,
  getCategoriesWithStatus,
} from '../../soundCategories/selectors';

const memoizeBoardList = state => state.soundBoards.list;
const memoizeUi = state => state.soundBoards.ui;

export const getBoards = createSelector(
  memoizeBoardList,
  list => list
);

export const getBoardsWithStatus = createSelector(
  [getBoards, getCategoriesWithStatus],
  (boards, categories) => boards.map(board => ({
    ...board,
    playing: categories.filter(category => (
      category.board === board.uuid
      && category.playing
    )).length > 0
  }))
);

export const findBoard = (boards, boardUuid) => boards.find(
  board => board.uuid === boardUuid
);

export const getBoard = createSelector(
  (state, boardUuid) => findBoard(getBoards(state), boardUuid),
  board => board
);

export const getBoardName = createSelector(
  getBoard,
  board => board.name
);

export const getBoardCategories = createSelector(
  (state, boardUuid) => getCategories(state)
    .filter(category => category.board === boardUuid),
  categories => categories
);

export const getBoardCategoryByName = createSelector(
  (state, boardUuid, categoryName) => getBoardCategories(state, boardUuid)
    .find(category => category.name === categoryName),
  category => category
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

export const isCategoryCreateFormVisible = getFlag(memoizeUi, 'showCreateForm');

export const isBoardRenameDialogVisible = getFlag(memoizeUi, 'showBoardRenameDialog');
