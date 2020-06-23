import { createEntityStore } from 'redux-entity-store'
import { fetchFailure, turnOff, turnOn } from 'react-saga-rest'
import { moduleRoutines } from './actions'
import { uiRoutines } from '../ui/actions'

export const moduleStore = createEntityStore({
  name: 'modules',
  identSource: 'url',
  initialState: {
    loading: false,
    name: null,
    url: null
  },
  belongsTo: [
    {
      collection: 'libraries',
      attr: 'library'
    },
    {
      collection: 'modules',
      attr: 'parent'
    }
  ],
  providedBy: [moduleRoutines.load, moduleRoutines.register],
  clearedBy: [uiRoutines.purge],
  on: {
    [moduleRoutines.load.FAILURE]: fetchFailure,
    [moduleRoutines.load.FULFILL]: turnOff('loading'),
    [moduleRoutines.load.REQUEST]: turnOn('loading')
  }
})
