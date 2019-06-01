import configureStore from 'redux-mock-store';
import DndTestBackend from 'react-dnd-test-backend';
import React from 'react';

import { createStore } from 'redux';
import { DragDropContextProvider } from 'react-dnd';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import reducers from '../src/reducers';

export const mockStore = (initialState) => {
  const appStore = createStore(reducers, initialState);
  const mockStore = configureStore();
  return mockStore(appStore.getState());
};


export const renderWithContainers = (children, state) => {
  const store = mockStore(state);
  const comp = mount(
    <Provider store={store}>
      {children}
    </Provider>
  );
  comp.store = store;
  return comp;
};

export const renderWithDnd = (children, state) => {
  const store = mockStore(state);
  const comp = mount(
    <Provider store={store}>
      <DragDropContextProvider backend={DndTestBackend}>
        {children}
      </DragDropContextProvider>
    </Provider>
  );
  comp.store = store;
  return comp;
}
