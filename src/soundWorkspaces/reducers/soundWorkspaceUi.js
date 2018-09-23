import { handleActions } from 'redux-actions';

import { workspace } from '../actions';
import { VIEW_BOARD, VIEW_LIBRARY } from '../constants';

const initialState = {
  board: null,
  view: VIEW_LIBRARY,
};

const ui = handleActions({
  [workspace.SELECT_BOARD]: (state, action) => ({
    ...state,
    view: VIEW_BOARD,
    board: action.payload,
  }),
  [workspace.SELECT_VIEW]: (state, action) => ({
    ...state,
    view: action.payload,
  }),
}, initialState);

export default ui;
