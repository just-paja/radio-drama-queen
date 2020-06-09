import { createEntityRoutines } from 'redux-entity-store'

export const moduleRoutines = createEntityRoutines('MODULE', [
  'REGISTER',
  'LOAD'
])
