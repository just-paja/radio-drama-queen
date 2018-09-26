import categoryCreate from './categoryCreate';
import categoryLoopToggle from './categoryLoopToggle';
import categoryRemove from './categoryRemove';
import categorySoundPlay from './categorySoundPlay';
import categoryStop from './categoryStop';
import categoryVolume from './categoryVolume';
import soundDrop from './soundDrop';

export * from './categoryCreate';

export default [
  ...categoryCreate,
  ...categoryLoopToggle,
  ...categoryRemove,
  ...categorySoundPlay,
  ...categoryStop,
  ...categoryVolume,
  ...soundDrop,
];
