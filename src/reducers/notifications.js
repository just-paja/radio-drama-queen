import { handleActions } from 'redux-actions';

import createListReducer from './createListReducer';

import { notify } from '../actions';

const initialState = {
  visible: true,
};

const notification = handleActions({
  [notify.HIDE]: state => ({
    ...state,
    visible: false,
  }),
}, initialState);

notification.actions = [
  notify.HIDE,
];

export default createListReducer(notify, notification, initialState);
