import { createRoutine } from '../../actions/routines';

export const library = createRoutine('LIBRARY', [
  'OPEN_DIALOG_HIDE',
  'OPEN_DIALOG_SHOW',
  'OPEN_DIALOG_SUBMIT',
  'SAVE_AS_CANCEL',
  'SAVE_AS_HIDE',
  'SAVE_AS_SUBMIT',
  'SAVE_AS',
  'SAVE',
  'SET_CONFIG',
]);

export const soundModule = createRoutine('SOUND_MODULE', [
  'DOWNLOAD_FAILURE',
  'DOWNLOAD_REQUEST',
  'DOWNLOAD_SUCCESS',
]);
