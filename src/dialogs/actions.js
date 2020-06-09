import { createEntityRoutines } from 'redux-entity-store'

export const dialogRoutines = createEntityRoutines('DIALOG', ['OPEN', 'CLOSE'])
