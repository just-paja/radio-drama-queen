import tag, { initialState } from './tag';
import createListReducer from './createListReducer';

import { tagList } from '../actions';

export default createListReducer(tagList, tag, initialState);
