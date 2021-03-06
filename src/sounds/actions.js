import { createEntityRoutines } from 'redux-entity-routines'

export const soundRoutines = createEntityRoutines('SOUND', [
  'EDIT',
  'FOCUS',
  'LOAD',
  'LOOP_OFF',
  'LOOP_ON',
  'PLAY',
  'READ',
  'REGISTER',
  'SET_NAME',
  'SET_TAGS',
  'SET_VOLUME_GROUP',
  'SET_VOLUME',
  'STOP_ALL',
  'STOP_GROUP',
  'STOP',
  'TOGGLE',
  'UNLOAD'
])
