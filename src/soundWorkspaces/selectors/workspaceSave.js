import { createSelector } from 'reselect';

import { getBoards } from '../../soundBoards/selectors';
import { getCategories } from '../../soundCategories/selectors';
import { memoizeSoundList } from '../../sounds/selectors';

const getWorkspacesState = state => state.soundWorkspaces;

const getLoadState = state => getWorkspacesState(state).load;
const getSaveState = state => getWorkspacesState(state).save;

export const isLoadFromDialogOpen = createSelector(
  getLoadState,
  state => state.loadFromDialogOpen
);

export const isWorkspaceEmpty = createSelector(
  getBoards,
  boards => boards.length === 0
);

export const isSaveAsDialogOpen = createSelector(
  getSaveState,
  state => state.saveAsDialogOpen
);

export const getWorkspaceFilePath = createSelector(
  getSaveState,
  state => state.path
);

export const getUsedSounds = createSelector(
  [memoizeSoundList, getCategories],
  (sounds, categories) => sounds.filter(
    sound => categories.some(category => category.sounds.indexOf(sound.uuid) !== -1),
  )
);
