import { handleActions } from 'redux-actions';
import { turnOff, turnOn } from 'react-saga-rest';

import { categoryCreate } from '../actions';

const initialState = {
  showCreateForm: false,
};

const category = handleActions({
  [categoryCreate.FORM_SHOW]: turnOn('showCreateForm'),
  [categoryCreate.FORM_HIDE]: turnOff('showCreateForm'),
}, initialState);

export default category;
