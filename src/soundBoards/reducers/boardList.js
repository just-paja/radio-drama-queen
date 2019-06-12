import board, { initialState } from './board'

import { createListReducer } from '../../lists'
import { soundBoard } from '../actions'

export default createListReducer(soundBoard, board, initialState)
