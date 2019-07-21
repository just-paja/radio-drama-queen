import { createSelector } from 'reselect'
import { moduleStore } from '../soundModules'

export const countLibraryModules = createSelector(
  moduleStore.getCollection,
  (state, libraryUrl) => libraryUrl,
  (modules, libraryUrl) => modules.filter(module => module.library === libraryUrl).length
)
