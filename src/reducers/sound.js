import { handleActions } from 'redux-actions';

import { soundList } from '../actions';

export const initialState = {
  loading: false,
  name: '',
  path: '',
  playing: false,
  tags: [],
  uuid: null,
  valid: false,
};

const sound = handleActions({
  [soundList.PLAY]: state => ({
    ...state,
    playing: true,
  }),
  [soundList.PLAY_FAILURE]: state => ({
    ...state,
    playing: false,
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
    error: action.payload,
  }),
  [soundList.SET_NAME]: (state, action) => ({
    ...state,
    name: action.payload,
  }),
  [soundList.SET_TAGS]: (state, action) => ({
    ...state,
    tags: action.payload,
  }),
  [soundList.TAG_ADD]: (state, action) => ({
    ...state,
    tags: [
      ...state.tags,
      action.payload,
    ],
  }),
  [soundList.TAG_REMOVE]: (state, action) => {
    const index = state.indexOf(action.payload);
    if (index !== -1) {
      const tags = state.tags.slice();
      tags.splice(index, 1);
      return {
        ...state,
        tags,
      };
    }
    return state;
  },
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
