import { handleActions } from 'redux-actions';

import { soundList } from '../actions';

export const initialState = {
  loading: false,
  name: '',
  path: '',
  playing: false,
  valid: false,
};

const sound = handleActions({
  [soundList.PLAY]: state => ({
    ...state,
    playing: true,
  }),
  [soundList.PLAY_FAILURE]: state => ({
    ...state,
    playing: true,
  }),
  [soundList.FINISHED]: state => ({
    ...state,
    playing: false,
  }),
  [soundList.STOP]: state => ({
    ...state,
    playing: false,
  }),
  [soundList.LOAD_REQUEST]: state => ({
    ...state,
    loading: true,
  }),
  [soundList.LOAD_SUCCESS]: state => ({
    ...state,
    loading: false,
    valid: true,
  }),
  [soundList.LOAD_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }),
  [soundList.SET_NAME]: (state, action) => ({
    ...state,
    name: action.payload,
  }),
}, initialState);

sound.actions = [
  soundList.FINISHED,
  soundList.LOAD_FAILURE,
  soundList.LOAD_REQUEST,
  soundList.LOAD_SUCCESS,
  soundList.PLAY_FAILURE,
  soundList.PLAY,
  soundList.SET_NAME,
  soundList.STOP,
  soundList.TOGGLE,
];

export default sound;
