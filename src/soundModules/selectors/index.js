import { createSelector } from 'reselect'

const memoizeConfig = state => state.soundModules.config
const memoizeUi = state => state.soundModules.ui

export const getLibraryFsPath = createSelector(
  memoizeConfig,
  config => config.fsPath
)

export const getModules = createSelector(
  memoizeConfig,
  state => state.modules
)

export const isOpenLibraryDialogOpen = createSelector(
  memoizeUi,
  state => state.showOpenLibraryDialog
)
