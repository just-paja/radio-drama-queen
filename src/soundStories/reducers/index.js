import { combineReducers } from 'redux'

import storyList from './storyList'

export default combineReducers({
  list: storyList
})
