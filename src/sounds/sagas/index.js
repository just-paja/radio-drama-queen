import soundLoad from './soundLoad';
import soundPlay from './soundPlay';
import soundStop from './soundStop';
import soundToggle from './soundToggle';

export default [
  ...soundLoad,
  ...soundPlay,
  ...soundStop,
  ...soundToggle,
];
