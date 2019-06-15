import { createListReducer } from '../../lists'
import { stories } from '../actions'
import story, { initialState } from './story'

export const storyList = createListReducer([
  stories
], story, initialState)
