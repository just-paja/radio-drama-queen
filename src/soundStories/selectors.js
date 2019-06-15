import { getFlag } from 'react-saga-rest'
import { createSelector } from 'reselect'

const memoizeWorkspace = state => state.soundWorkspaces.ui
const memoizeStoryList = state => state.soundStories.list
const memoizeUi = state => state.soundStories.ui

export const getStories = createSelector(memoizeStoryList, state => state)

export const areStoriesEmpty = createSelector(
  memoizeStoryList,
  list => list.length <= 0
)

export const getActiveStory = createSelector(
  memoizeWorkspace,
  state => state.story
)

export const isStoryCreateDialogVisible = getFlag(memoizeUi, 'showStoryCreateDialog')
