import tag, { initialState } from './tag'

import { createListReducer } from '../../lists'
import { tagList } from '../actions'

export default createListReducer(tagList, tag, initialState)
