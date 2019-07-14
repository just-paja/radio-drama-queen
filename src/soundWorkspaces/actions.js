import { createRoutine } from '../actions/routines'
import { createEntityRoutines } from '../entities'

export const workspaceRoutines = createEntityRoutines('WORKSPACE', [
  'ADD_SOUND',
  'ADD_TAG',
  'GO_BACK',
  'SELECT_BOARD',
  'SELECT_VIEW',
  'WIPE'
])

export const workspaceLoad = createRoutine('WORKSPACE_LOAD', [
  'DESTINATION_CHANGE',
  'DIALOG_HIDE',
  'DIALOG_OPEN',
  'FAILURE',
  'FULFILL',
  'LOAD_FROM',
  'REQUEST',
  'RESET',
  'SUCCESS',
  'TRIGGER'
])
