import { handleActions } from 'redux-actions';

export const initialState = {
  name: '',
};

const tag = handleActions({}, initialState);

tag.actions = [];

export default tag;
