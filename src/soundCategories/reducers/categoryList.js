import category, { initialState } from './category';

import { createListReducer } from '../../lists';
import { categoryList, categoryRename } from '../actions';

export default createListReducer([
  categoryList,
  categoryRename,
], category, initialState);
