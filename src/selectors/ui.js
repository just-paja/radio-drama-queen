import { createSelector } from 'reselect';

export const isSaveAsDialogOpen = createSelector(
  state => state.ui,
  state => state.showSaveAsDialog
);

export const isOpenLibraryDialogOpen = createSelector(
  state => state.ui,
  state => state.showOpenLibraryDialog
);
