import { createRoutine } from '../../actions/routines';

export const workspace = createRoutine('WORKSPACE', [
  'SELECT_BOARD',
  'SELECT_VIEW',
  'GO_BACK',
]);

export const workspaceSound = createRoutine('WORKSPACE_SOUND', [
  'ADD_TO_BOARD',
]);

export const workspaceTag = createRoutine('WORKSPACE_TAG', [
  'ADD_TO_BOARD',
]);

export const workspaceSave = createRoutine('WORKSPACE_SAVE', [
  'DESTINATION_CHANGE',
  'DIALOG_HIDE',
  'DIALOG_OPEN',
  'FAILURE',
  'FULFILL',
  'REQUEST',
  'SAVE_AS',
  'SUCCESS',
  'TRIGGER',
]);

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
  'TRIGGER',
]);
