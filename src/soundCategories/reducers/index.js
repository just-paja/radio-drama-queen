import { combineReducers } from 'redux';

import categoryGrid from './categoryGrid';
import categoryList from './categoryList';

export default combineReducers({
  grid: categoryGrid,
  list: categoryList,
});
