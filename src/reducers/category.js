import { handleActions } from 'redux-actions';

import { categoryList } from '../actions';

const initialState = {
  loop: false,
  sounds: [],
};

const category = handleActions({
  [categoryList.LOOP_TOGGLE]: state => ({
    ...state,
    loop: !state.loop,
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
}, initialState);

category.actions = [
  categoryList.LOOP_TOGGLE,
  categoryList.SOUND_ADD,
  categoryList.SOUND_REMOVE,
];

export default category;
