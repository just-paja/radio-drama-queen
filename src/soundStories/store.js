import { createEntityStore } from 'redux-entity-routines'
import { createSelector } from 'reselect'
import { storyRoutines } from './actions'

export const storyStore = createEntityStore('stories', {
  identAttr: 'uuid',
  providedBy: [
    storyRoutines.create,
    storyRoutines.list,
    storyRoutines.load,
    storyRoutines.rename,
    storyRoutines.save
  ],
  deletedBy: [
    storyRoutines.remove
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
