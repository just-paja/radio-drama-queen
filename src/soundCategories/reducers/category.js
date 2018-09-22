import { handleActions } from 'redux-actions';

import { categoryList } from '../actions';

export const initialState = {
  loop: false,
  muted: false,
  sounds: [],
  volume: 50,
};

export default handleActions({
  [categoryList.LOOP_TOGGLE]: state => ({
    ...state,
    loop: !state.loop,
  }),
  [categoryList.MUTE_TOGGLE]: state => ({
    ...state,
    muted: !state.muted,
  }),
  [categoryList.EXCLUSIVE_TOGGLE]: state => ({
    ...state,
    exclusive: !state.exclusive,
  }),
  [categoryList.UNMUTE]: state => ({
    ...state,
    muted: false,
  }),
  [categoryList.SOUND_ADD]: (state, action) => ({
    ...state,
    sounds: [
      ...state.sounds,
      action.payload,
    ],
  }),
  [categoryList.SOUND_REMOVE]: (state, action) => {
    const soundIndex = state.sounds.indexOf(action.payload);
    if (soundIndex !== -1) {
      const sounds = state.sounds.slice();
      sounds.splice(soundIndex, 1);
      return {
        ...state,
        sounds,
      };
    }
    return state;
  },
  [categoryList.SET_VOLUME]: (state, action) => ({
    ...state,
    volume: action.payload,
  }),
}, initialState);
