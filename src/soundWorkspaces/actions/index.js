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
