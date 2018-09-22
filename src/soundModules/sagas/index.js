import libraryLoad from './libraryLoad';
import moduleLoad from './moduleLoad';
import moduleResources from './moduleResources';

export default [
  ...libraryLoad,
  ...moduleLoad,
  ...moduleResources,
];
