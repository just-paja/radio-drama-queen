import { createEntityRoutines } from '../entities/actions'

export const moduleRoutines = createEntityRoutines('MODULE', [
  'REGISTER',
  'LOAD'
])
