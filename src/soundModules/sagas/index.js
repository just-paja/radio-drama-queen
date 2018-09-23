import libraryLoad from './libraryLoad';
import libraryWipe from './libraryWipe';
import moduleLoad from './moduleLoad';
import moduleResources from './moduleResources';

export default [
  ...libraryLoad,
  ...libraryWipe,
  ...moduleLoad,
  ...moduleResources,
];
