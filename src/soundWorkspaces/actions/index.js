import { createRoutine } from '../../actions/routines';

export const workspace = createRoutine('WORKSPACE', [
  'SELECT_BOARD',
  'SELECT_VIEW',
]);

export default { workspace };
