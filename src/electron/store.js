import reducers from '../reducers'

import { createStore } from 'redux'

export function configureBackendStore (initialState = {}) {
  return createStore(reducers, initialState)
}
