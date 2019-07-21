import { createEntityRoutines } from 'redux-entity-routines'

export const dialogRoutines = createEntityRoutines('DIALOG', [
  'OPEN',
  'CLOSE'
])
