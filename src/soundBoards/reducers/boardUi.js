import { handleActions } from 'redux-actions';

import { categoryCreate } from '../actions';

const initialState = {
  showCreateForm: false,
};

const category = handleActions({
  [categoryCreate.FORM_SHOW]: state => ({
    ...state,
    showCreateForm: true,
  }),
  [categoryCreate.FORM_HIDE]: state => ({
    ...state,
    showCreateForm: false,
  }),
}, initialState);

export default category;
