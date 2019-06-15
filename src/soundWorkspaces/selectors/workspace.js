import { createSelector } from 'reselect'

import { getBoards, findBoard } from '../../soundBoards/selectors'

const getWorkspacesState = state => state.soundWorkspaces
const getUiState = state => getWorkspacesState(state).ui

export const getActiveBoardUuid = createSelector(
  getUiState,
  config => config.board
)

export const getActiveBoard = createSelector(
  [getBoards, getActiveBoardUuid],
  findBoard
)

const getLastUsedBoardUuid = createSelector(
  getBoards,
  boards => boards[0]
)

export const getDefaultTargetBoard = createSelector(
  [getActiveBoard, getLastUsedBoardUuid],
  (activeBoard, lastUsedBoard) => activeBoard || lastUsedBoard
)

export const getWorkspaceView = createSelector(
  getUiState,
  state => state.view
)

export const getActiveStoryName = createSelector(
  getUiState,
  state => state.story
)
