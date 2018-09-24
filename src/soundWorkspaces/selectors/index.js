import { createSelector } from 'reselect';

import { getBoards } from '../../soundBoards/selectors';

const memoizeUi = state => state.soundWorkspaces.ui;

export const getActiveBoardUuid = createSelector(
  memoizeUi,
  config => config.board
);

export const getActiveBoard = createSelector(
  [getBoards, getActiveBoardUuid],
  (boards, activeBoardUuid) => boards.find(board => board.uuid === activeBoardUuid)
);

export const getLastUsedBoard = createSelector(
  [getBoards],
  boards => boards[0]
);

export const getDefaultTargetBoard = createSelector(
  [getActiveBoard, getLastUsedBoard],
  (activeBoard, lastUsedBoard) => activeBoard || lastUsedBoard
);

export const getWorkspaceView = createSelector(
  memoizeUi,
  config => config.view
);
