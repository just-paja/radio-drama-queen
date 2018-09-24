import { createRoutine } from '../../actions/routines';

export const gallerySound = createRoutine('GALLERY_SOUND', [
  'PLAY',
  'ADD_TO_GRID',
]);

export default { gallerySound };
