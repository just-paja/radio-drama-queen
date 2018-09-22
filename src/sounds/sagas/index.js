import soundLoad from './soundLoad';
import soundPlay from './soundPlay';
import soundStop from './soundStop';
import soundToggle from './soundToggle';
import soundVolumeChange from './soundVolumeChange';

export * from './soundAdd';

export default [
  ...soundLoad,
  ...soundPlay,
  ...soundStop,
  ...soundToggle,
  ...soundVolumeChange,
];
