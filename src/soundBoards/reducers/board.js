import { handleActions } from 'redux-actions';

import { soundBoard } from '../actions';

export const initialState = {
  name: null,
};

export default handleActions({
  [soundBoard.RENAME]: (state, action) => ({
    ...state,
    name: action.payload,
  }),
}, initialState);
