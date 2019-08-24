import soundGallery from '../soundGallery/reducers'
import soundWorkspaces from '../soundWorkspaces/reducers'

import { boardStore } from '../soundBoards/store'
import { categoryStore } from '../soundCategories/store'
import { combineReducers } from 'redux'
import { createEntitiesReducer, operations } from 'redux-entity-routines'
import { dialogStore } from '../dialogs/store'
import { libraryStore } from '../soundLibraries/store'
import { moduleStore } from '../soundModules/store'
import { reducer as form } from 'redux-form'
import { soundStore } from '../sounds/store'
import { storyRoutines } from '../soundStories/actions'
import { storyStore } from '../soundStories/store'
import { tagStore } from '../soundTags/store'
import { workspaceRoutines } from '../soundWorkspaces/actions'

const appReducer = combineReducers({
  entities: createEntitiesReducer(
    boardStore,
    categoryStore,
    dialogStore,
    libraryStore,
    moduleStore,
    soundStore,
    storyStore,
    tagStore
  ),
  form,
  operations,
  soundGallery,
  soundWorkspaces
})

function normalizeStoryState (state, story) {
  const { name, uuid, entities, operations, ...nextState } = story
  if (!entities) {
    return {
      ...state,
      ...nextState,
      entities: {
        ...state.entities,
        boards: [],
        categories: [],
        dialogs: [],
        libraries: [],
        modules: [],
        sounds: [],
        tags: []
      }
    }
  }
  const { stories, ...otherEntities } = entities
  return {
    ...state,
    ...nextState,
    entities: {
      ...state.entities,
      ...otherEntities
    }
  }
}

export default (state, action) => {
  if (action && action.type === workspaceRoutines.load.SUCCESS) {
    return appReducer({ ...state, ...action.payload }, action)
  }
  if (action && action.type === storyRoutines.load.SUCCESS) {
    return appReducer(normalizeStoryState(state, action.payload), action)
  }
  return appReducer(state, action)
}
