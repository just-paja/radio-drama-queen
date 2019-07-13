import { boardStore } from '../../soundBoards'
import { createSelector } from 'reselect'
import { storyStore } from '../../soundStories'

const getWorkspacesState = state => state.soundWorkspaces
const getUiState = state => getWorkspacesState(state).ui

export const getActiveBoardUuid = createSelector(
  getUiState,
  config => config.board
)

export const getActiveBoard = createSelector(
  [boardStore.getAll, getActiveBoardUuid],
  (boards, uuid) => boards.find(board => board.uuid === uuid)
)

const getLastUsedBoardUuid = createSelector(
  boardStore.getAll,
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

export const getActiveStory = createSelector(
  storyStore.getAll,
  getUiState,
  (stories, uiState) => stories.find(story => story.uuid === uiState.story)
)
