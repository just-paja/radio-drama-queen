import { handleActions } from 'redux-actions';
import { changeParam, replaceState } from 'react-saga-rest';

import { soundSearch as soundSearchActions } from '../actions';

const initialState = {
  search: '',
};

const soundSearch = handleActions({
  [soundSearchActions.CHANGE]: changeParam('search', 'payload'),
  [soundSearchActions.CLEAR]: replaceState(initialState),
}, initialState);

export default soundSearch;
