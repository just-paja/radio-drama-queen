import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import soundBoards from '../soundBoards/reducers'
import soundCategories from '../soundCategories/reducers'
import soundGallery from '../soundGallery/reducers'
import soundModules from '../soundModules/reducers'
import sounds from '../sounds/reducers'
import soundTags from '../soundTags/reducers'
import soundWorkspaces from '../soundWorkspaces/reducers'

import { workspaceLoad } from '../soundWorkspaces/actions'

const appReducer = combineReducers({
  form,
  soundBoards,
  soundCategories,
  soundGallery,
  soundModules,
  sounds,
  soundTags,
  soundWorkspaces
})

export default (state, action) => {
  if (action.type === workspaceLoad.RESET) {
    return action.payload
  }
  return appReducer(state, action)
}
