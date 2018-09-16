import tag, { initialState } from './tag';
import createListReducer from '../../reducers/createListReducer';

import { tagList } from '../actions';

export default createListReducer(tagList, tag, initialState);
