import soundGallery from '../soundGallery/reducers'
import soundWorkspaces from '../soundWorkspaces/reducers'

import { boardStore } from '../soundBoards'
import { categoryStore } from '../soundCategories'
import { combineReducers } from 'redux'
import { createEntitiesReducer } from '../entities'
import { dialogStore } from '../dialogs'
import { libraryStore } from '../soundLibraries'
import { moduleStore } from '../soundModules'
import { reducer as form } from 'redux-form'
import { soundStore } from '../sounds'
import { storyRoutines, storyStore } from '../soundStories'
import { tagStore } from '../soundTags'

const appReducer = combineReducers({
  entities: createEntitiesReducer({
    boards: boardStore.reducer,
    categories: categoryStore.reducer,
    dialogs: dialogStore.reducer,
    libraries: libraryStore.reducer,
    modules: moduleStore.reducer,
    sounds: soundStore.reducer,
    stories: storyStore.reducer,
    tags: tagStore.reducer
  }),
  form,
  soundGallery,
  soundWorkspaces
})

function normalizeStoryState (state, story) {
  const { name, ...nextState } = story
  return {
    ...state,
    ...nextState
  }
}

export default (state, action) => {
  if (action.type === storyRoutines.load.SUCCESS) {
    return appReducer(normalizeStoryState(state, action.payload), action)
  }
  return appReducer(state, action)
}
