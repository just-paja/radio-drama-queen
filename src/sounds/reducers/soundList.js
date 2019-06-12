import sound, { initialState } from './sound'

import { createListReducer } from '../../lists'
import { soundList, soundLoad } from '../actions'

export default createListReducer([
  soundList,
  soundLoad
], sound, initialState)
