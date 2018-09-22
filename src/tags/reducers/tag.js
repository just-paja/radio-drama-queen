import { handleActions } from 'redux-actions';

export const initialState = {
  name: '',
};

export default handleActions({}, initialState);
