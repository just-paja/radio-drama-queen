import { createEntityRoutines } from 'redux-entity-routines'

export const tagRoutines = createEntityRoutines('TAG', [
  'ADD_TO_BOARD',
  'REGISTER'
])
