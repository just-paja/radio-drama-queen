import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import soundBoards from '../soundBoards/reducers'
import soundCategories from '../soundCategories/reducers'
import soundGallery from '../soundGallery/reducers'
import soundModules from '../soundModules/reducers'
import sounds from '../sounds/reducers'
import soundStories from '../soundStories/reducers'
import soundTags from '../soundTags/reducers'
import soundWorkspaces from '../soundWorkspaces/reducers'

import { storyLoad } from '../soundStories/actions'

const appReducer = combineReducers({
  form,
  soundBoards,
  soundCategories,
  soundGallery,
  soundModules,
  sounds,
  soundStories,
  soundTags,
  soundWorkspaces
})

export default (state, action) => {
  if (action.type === storyLoad.SUCCESS) {
    const { name, ...nextState } = action.payload
    return nextState
  }
  return appReducer(state, action)
}
