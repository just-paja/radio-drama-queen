import boardCategoryCreate from './boardCategoryCreate'
import boardCreate from './boardCreate'
import boardRemove from './boardRemove'
import boardRename from './boardRename'
import boardSoundAdd from './boardSoundAdd'
import boardSoundDrop from './boardSoundDrop'
import boardTagAdd from './boardTagAdd'

export * from './boardCategoryCreateDefault'
export * from './boardCreate'

export default [
  ...boardCategoryCreate,
  ...boardCreate,
  ...boardRemove,
  ...boardRename,
  ...boardSoundAdd,
  ...boardSoundDrop,
  ...boardTagAdd
]
