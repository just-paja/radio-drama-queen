import { combineReducers } from 'redux'

import { storyList } from './storyList'
import { storyUi } from './storyUi'

export default combineReducers({
  list: storyList,
  ui: storyUi
})
