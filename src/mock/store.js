import configureStore from 'redux-mock-store'
import DndTestBackend from 'react-dnd-test-backend'
import React from 'react'
import reducers from '../reducers'

import { createStore } from 'redux'
import { DragDropContextProvider } from 'react-dnd'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from '../theme'

export const mockStore = (initialState) => {
  const appStore = createStore(reducers, initialState)
  const mockStore = configureStore()
  return mockStore(appStore.getState())
}

export const renderWithContainers = (children, state) => {
  const store = mockStore(state)
  const comp = mount(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </Provider>
  )
  comp.store = store
  return comp
}

export const renderWithDnd = (children, state) => {
  const store = mockStore(state)
  const comp = mount(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DragDropContextProvider backend={DndTestBackend}>
          {children}
        </DragDropContextProvider>
      </ThemeProvider>
    </Provider>
  )
  comp.store = store
  return comp
}
