import { createSelector } from 'reselect'
import { getFlag } from 'react-saga-rest'
import { categoryStore } from '../soundCategories'
import { libraryStore } from '../soundLibraries'
import { moduleStore } from '../soundModules'
import { soundStore } from '../sounds'

const memoizeSearch = state => state.soundGallery.search
const memoizeTarget = state => state.soundGallery.target
const memoizeBrowser = state => state.soundGallery.browser

export const getSoundSearchValue = createSelector(
  memoizeSearch,
  state => state.search
)

export const isGalleryEmpty = createSelector(
  soundStore.getSize,
  gallerySize => gallerySize <= 0
)

export const getErrorsFilter = getFlag(memoizeSearch, 'filterErrors')
export const getUsedFilter = getFlag(memoizeSearch, 'filterUsed')

export const getBrowserLibrary = createSelector(
  memoizeBrowser,
  libraryStore.getCollection,
  (browser, libraries) => {
    if (browser.libraryUrl) {
      return browser.libraryUrl
    }
    return libraries.length > 0 ? libraries[0].url : null
  }
)

export const getBrowserModuleUrl = createSelector(
  memoizeBrowser,
  getBrowserLibrary,
  (browser, libraryUrl) => {
    if (!libraryUrl) {
      return null
    }
    return browser.moduleUrl || null
  }
)

export const getBrowserModule = moduleStore.createFindSelector(
  getBrowserModuleUrl
)

const filterModuleSounds = createSelector(
  soundStore.getAll,
  getBrowserModuleUrl,
  (sounds, moduleUrl) => sounds.filter(sound => sound.module === moduleUrl)
)

const filterUnusedSounds = createSelector(
  filterModuleSounds,
  categoryStore.getAll,
  getUsedFilter,
  (sounds, categories, filterUsed) => {
    if (filterUsed) {
      return sounds.filter(sound =>
        categories.every(category => category.sounds.includes(sound.cachePath))
      )
    }
    return sounds
  }
)

function flagSounds (sounds, categories) {
  return sounds.map(sound => ({
    ...sound,
    isUsed: categories.some(category =>
      category.sounds.includes(sound.cachePath)
    )
  }))
}

export const getGallerySoundList = createSelector(
  [filterUnusedSounds, categoryStore.getAll, getErrorsFilter],
  (sounds, categories, filterErrors) => {
    let soundsFiltered = sounds
    if (filterErrors) {
      soundsFiltered = soundsFiltered.filter(sound => !sound.error)
    }
    return flagSounds(soundsFiltered, categories)
  }
)

export const getGalleryTarget = createSelector(memoizeTarget, state => state)
