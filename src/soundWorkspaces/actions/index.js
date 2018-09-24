import { createRoutine } from '../../actions/routines';

export const workspace = createRoutine('WORKSPACE', [
  'SELECT_BOARD',
  'SELECT_VIEW',
]);

export const workspaceSound = createRoutine('WORKSPACE_SOUND', [
  'ADD_TO_BOARD',
]);

export default { workspace };
