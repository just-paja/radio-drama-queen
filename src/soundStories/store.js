import { createEntityStore } from 'redux-entity-store'
import { createSelector } from 'reselect'
import { storyRoutines } from './actions'

export const storyStore = createEntityStore({
  name: 'stories',
  identSource: 'uuid',
  providedBy: [
    storyRoutines.create,
    storyRoutines.list,
    storyRoutines.load,
    storyRoutines.rename,
    storyRoutines.save
  ],
  deletedBy: [storyRoutines.remove]
})

export const areStoriesEmpty = createSelector(
  storyStore.getAll,
  list => list.length <= 0
)

export const getActiveStory = createSelector(
  state => state.soundWorkspaces.ui,
  state => state.story
)

export const getStoryUuids = createSelector(storyStore.getAll, stories =>
  stories.map(story => story.uuid)
)
