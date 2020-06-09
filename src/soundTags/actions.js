import { createEntityRoutines } from 'redux-entity-store'

export const tagRoutines = createEntityRoutines('TAG', [
  'ADD_TO_BOARD',
  'REGISTER'
])
