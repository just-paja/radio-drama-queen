import { combineReducers } from 'redux'

import boardList from './boardList'
import boardUi from './boardUi'

export default combineReducers({
  list: boardList,
  ui: boardUi
})
