import { createRoutine } from '../../actions/routines';
import { createListRoutine } from '../../lists';

export const libraryLoad = createRoutine('LIBRARY_LOAD', [
  'DIALOG_HIDE',
  'DIALOG_SHOW',
  'SUBMIT',
  'SUCCESS',
  'FAILURE',
  'FULFILL',
]);

export const soundModule = createListRoutine('SOUND_MODULE', [
  'RELOAD',
  'DOWNLOAD_FAILURE',
  'DOWNLOAD_FULFILL',
  'DOWNLOAD_REQUEST',
  'DOWNLOAD_SUCCESS',
], 'name');
