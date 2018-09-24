import { createSelector } from 'reselect';

const memoizeUi = state => state.soundWorkspaces.ui;

export const getActiveBoard = createSelector(
  memoizeUi,
  config => config.board
);

export const getWorkspaceView = createSelector(
  memoizeUi,
  config => config.view
);
