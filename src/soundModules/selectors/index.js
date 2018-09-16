import { createSelector } from 'reselect';

const memoizeConfig = state => state.soundModules.config;
const memoizeList = state => state.soundModules.list;
const memoizeUi = state => state.soundModules.ui;

export const getLibraryFsPath = createSelector(
  memoizeConfig,
  config => config.fsPath
);

export const getModules = createSelector(
  memoizeConfig,
  state => state.modules
);

export const getModule = createSelector(
  (state, moduleName) => memoizeList(state).find(module => module.name === moduleName),
  state => state
);

export const isOpenLibraryDialogOpen = createSelector(
  memoizeUi,
  state => state.showOpenLibraryDialog
);
