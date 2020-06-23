import { fetchFailure, turnOff, turnOn } from 'react-saga-rest'
import { createEntityStore } from 'redux-entity-store'
import { libraryRoutines } from './actions'
import { uiRoutines } from '../ui/actions'

export const libraryStore = createEntityStore({
  name: 'libraries',
  identSource: 'url',
  initialState: {
    directory: null,
    loading: false,
    name: null,
    url: null
  },
  providedBy: [libraryRoutines.load],
  clearedBy: [uiRoutines.purge],
  on: {
    [libraryRoutines.load.FAILURE]: fetchFailure,
    [libraryRoutines.load.FULFILL]: turnOff('loading'),
    [libraryRoutines.load.REQUEST]: turnOn('loading')
  }
})
