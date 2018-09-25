import categoryCreate from './categoryCreate';
import categoryLoopToggle from './categoryLoopToggle';
import categorySoundPlay from './categorySoundPlay';
import categoryStop from './categoryStop';
import categoryVolume from './categoryVolume';
import soundDrop from './soundDrop';

export * from './categoryCreate';

export default [
  ...categoryCreate,
  ...categoryLoopToggle,
  ...categorySoundPlay,
  ...categoryStop,
  ...categoryVolume,
  ...soundDrop,
];
