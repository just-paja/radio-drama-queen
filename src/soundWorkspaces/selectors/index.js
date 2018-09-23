import { createSelector } from 'reselect';

const memoizeUi = state => state.soundWorkspaces.ui;

export const getWorkspaceView = createSelector(
  memoizeUi,
  config => config.view
);

export default { memoizeUi };
