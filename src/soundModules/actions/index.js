import { createRoutine } from '../../actions/routines'
import { createListRoutine } from '../../lists'

export const libraryWipe = createRoutine('LIBRARY_WIPE', [
  'SUCCESS',
  'TRIGGER'
])

export const libraryLoad = createRoutine('LIBRARY_LOAD', [
  'DIALOG_HIDE',
  'DIALOG_SHOW',
  'FAILURE',
  'FULFILL',
  'REQUEST',
  'SUBMIT',
  'SUCCESS'
])

export const soundModule = createListRoutine('SOUND_MODULE', [
  'LOAD_FAILURE',
  'LOAD_FULFILL',
  'LOAD_REQUEST',
  'LOAD_SUCCESS',
  'LOAD_TRIGGER'
], 'name')
