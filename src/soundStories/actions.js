import { createEntityRoutines } from 'redux-entity-routines'

export const storyRoutines = createEntityRoutines('STORY', [
  'CREATE',
  'LIST',
  'LOAD',
  'REMOVE',
  'RENAME',
  'SAVE'
])
