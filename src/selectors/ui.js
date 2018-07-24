import { createSelector } from 'reselect';

export const isSaveAsDialogOpen = createSelector(
  state => state.ui,
  state => state.showSaveAsDialog
);

export default { isSaveAsDialogOpen };
