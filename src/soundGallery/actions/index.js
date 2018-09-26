import { createRoutine } from '../../actions/routines';

export const gallerySound = createRoutine('GALLERY_SOUND', [
  'PLAY',
]);

export const gallerySearch = createRoutine('GALLERY_SEARCH', [
  'CLEAR',
  'FILTER_USED_CHANGE',
  'CHANGE',
]);
