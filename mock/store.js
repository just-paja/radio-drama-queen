// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from 'redux-mock-store';

import { createStore } from 'redux';

import reducers from '../src/reducers';

export default (initialState) => {
  const appStore = createStore(reducers, initialState);
  const mockStore = configureStore();
  return mockStore(appStore.getState());
};
