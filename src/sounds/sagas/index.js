import soundLoad from './soundLoad';
import soundPlay from './soundPlay';
import soundStop from './soundStop';
import soundToggle from './soundToggle';
import soundVolumeChange from './soundVolumeChange';

export default [
  ...soundLoad,
  ...soundPlay,
  ...soundStop,
  ...soundToggle,
  ...soundVolumeChange,
];
