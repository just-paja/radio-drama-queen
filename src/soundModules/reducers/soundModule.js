import { handleActions } from 'redux-actions';

import { soundModule as actions } from '../actions';

export const initialState = {
  name: null,
  url: null,
  loading: false,
};

export default handleActions({
  [actions.DOWNLOAD_REQUEST]: state => ({
    ...state,
    loading: true,
  }),
  [actions.DOWNLOAD_SUCCESS]: (state, action) => ({
    ...state,
    ...action.meta,
    loading: false,
  }),
  [actions.DOWNLOAD_FAILURE]: state => ({
    ...state,
    loading: false,
  }),
}, initialState);
