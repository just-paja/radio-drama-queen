import story, { initialState } from './story'

import { createListReducer } from '../../lists'
import { stories } from '../actions'

export default createListReducer([
  stories
], story, initialState)
