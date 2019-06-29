import { createRoutine } from '../actions/routines'
import { createEntityRoutines } from '../entities'

export const workspaceRoutines = createEntityRoutines('WORKSPACE', [
  'ADD_SOUND',
  'GO_BACK',
  'SELECT_BOARD',
  'SELECT_VIEW',
  'WIPE'
])

export const workspaceTag = createRoutine('WORKSPACE_TAG', [
  'ADD_TO_BOARD'
])

export const workspaceSave = createRoutine('WORKSPACE_SAVE', [
  'DESTINATION_CHANGE',
  'DIALOG_HIDE',
  'DIALOG_OPEN',
  'FAILURE',
  'FULFILL',
  'REQUEST',
  'SAVE_AS',
  'SUCCESS',
  'TRIGGER'
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
