import { createListActionsRoutine, createListRoutine } from '../../lists'

export const soundList = createListRoutine('SOUND', [
  'FINISHED',
  'GROUP_STOP',
  'GROUP_VOLUME_SET',
  'LOAD_FAILURE',
  'LOAD_FULFILL',
  'LOAD_REQUEST',
  'LOAD_SUCCESS',
  'LOAD_TRIGGER',
  'LOAD',
  'LOOP_OFF',
  'LOOP_ON',
  'PLAY_FAILURE',
  'PLAY',
  'SET_NAME',
  'SET_TAGS',
  'STOP',
  'STOP_ALL',
  'TAG_ADD',
  'TAG_REMOVE',
  'TOGGLE',
  'VOLUME_SET',
  'UNLOAD',
  'UNLOAD_SUCCESS',
])

export const soundRegister = createListActionsRoutine('SOUND_REGISTER', [
  'TRIGGER',
  'REQUEST',
  'SUCCESS',
  'FAILURE',
  'FULFILL'
])

export const soundRead = createListActionsRoutine('SOUND_READ', [
  'TRIGGER',
  'REQUEST',
  'SUCCESS',
  'FAILURE',
  'FULFILL'
])

export const soundLoad = createListActionsRoutine('SOUND_LOAD', [
  'TRIGGER',
  'REQUEST',
  'SUCCESS',
  'FAILURE',
  'FULFILL'
])
