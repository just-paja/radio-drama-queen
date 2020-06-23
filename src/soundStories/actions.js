import { createEntityRoutines } from 'redux-entity-store'

export const storyRoutines = createEntityRoutines('STORY', [
  'CREATE',
  'LIST',
  'LOAD',
  'REMOVE',
  'RENAME',
  'SAVE',
  'UPDATE'
])
