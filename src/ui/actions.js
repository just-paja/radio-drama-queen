import { createEntityRoutines } from 'redux-entity-store'

export const uiRoutines = createEntityRoutines('UI', ['INIT', 'PURGE'])
