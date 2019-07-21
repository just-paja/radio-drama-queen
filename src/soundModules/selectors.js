import { createSelector } from 'reselect'
import { moduleStore } from './store'
import { soundStore } from '../sounds'

export function sortModules (a, b) {
  if (a.name > b.name) {
    return 1
  }
  if (a.name < b.name) {
    return -1
  }
  return 0
}

export const getModules = createSelector(
  moduleStore.getCollection,
  (state, libraryUrl) => libraryUrl,
  (state, libraryUrl, parentUrl) => parentUrl,
  (modules, libraryUrl, parentUrl) => {
    const possibleModules = libraryUrl
      ? modules.filter(module => (
        module.library === libraryUrl &&
        module.parent === parentUrl
      ))
      : modules.slice()
    return possibleModules.sort(sortModules)
  }
)

export const countModuleModules = createSelector(
  moduleStore.getCollection,
  (state, parentUrl) => parentUrl,
  (modules, parentUrl) => modules.filter(module => module.parent === parentUrl).length
)

export const countModuleSounds = createSelector(
  soundStore.getCollection,
  (state, parentUrl) => parentUrl,
  (sounds, parentUrl) => sounds.filter(sound => sound.module === parentUrl).length
)
