import { createEntityRoutines } from 'redux-entity-routines'

export const moduleRoutines = createEntityRoutines('MODULE', [
  'REGISTER',
  'LOAD'
])
