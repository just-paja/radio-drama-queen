import category, { initialState } from './category';
import createListReducer from '../../reducers/createListReducer';

import { categoryList } from '../actions';

export default createListReducer(categoryList, category, initialState);
