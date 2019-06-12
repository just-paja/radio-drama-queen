import { handleActions } from 'redux-actions'
import { changeParam } from 'react-saga-rest'

import { soundBoard } from '../actions'

export const initialState = {
  name: null
}

export default handleActions({
  [soundBoard.RENAME]: changeParam('name', 'payload')
}, initialState)
