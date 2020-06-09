import { categoryStore } from '../../soundCategories'
import { createSelector } from 'reselect'
import { soundStore } from '../../sounds'

const getWorkspacesState = state => state.soundWorkspaces

const getUiState = state => getWorkspacesState(state).ui

export const getWorkspaceFilePath = createSelector(
  getUiState,
  state => state.path
)

export const getUsedSounds = createSelector(
  [soundStore.getAll, categoryStore.getAll],
  (sounds, categories) =>
    sounds.filter(sound =>
      categories.some(category => category.sounds.includes(sound.cachePath))
    )
)
