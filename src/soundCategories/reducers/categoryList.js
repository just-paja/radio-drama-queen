import category, { initialState } from './category';

import { createListReducer } from '../../lists';
import { categoryList } from '../actions';

export default createListReducer(categoryList, category, initialState);
