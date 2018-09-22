import { createRoutine } from '../../actions/routines';
import { createListRoutine } from '../../lists';

export const library = createRoutine('LIBRARY', [
  'OPEN_DIALOG_HIDE',
  'OPEN_DIALOG_SHOW',
  'OPEN_DIALOG_SUBMIT',
  'SET_CONFIG',
]);

export const soundModule = createListRoutine('SOUND_MODULE', [
  'DOWNLOAD_FAILURE',
  'DOWNLOAD_REQUEST',
  'DOWNLOAD_SUCCESS',
], 'name');
