import { createEntityStore } from '../entities'
import { createSelector } from 'reselect'
import { storyRoutines } from './actions'

export const storyStore = createEntityStore('stories', {
  identAttr: 'name',
  providedBy: [
    storyRoutines.create,
    storyRoutines.list,
    storyRoutines.load,
    storyRoutines.save
  ]
})

export const areStoriesEmpty = createSelector(
  storyStore.getAll,
  list => list.length <= 0
)

export const getActiveStory = createSelector(
  state => state.soundWorkspaces.ui,
  state => state.story
)
