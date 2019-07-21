import { createSelector } from 'reselect'
import { getFlag } from 'react-saga-rest'

import { categoryStore } from '../soundCategories'
import { clearSearch, stringSearch } from '../search'
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

export const getSoundSearchValueCleared = createSelector(
  getSoundSearchValue,
  value => clearSearch(value)
)

const hasRelevantTitle = (item, search) => Boolean(item.title) &&
  Object.keys(item.title).some(key => stringSearch(item.title[key], search).relevant)

const isRelevant = (item, search, inclusive = false) => (
  stringSearch(item.name, search, inclusive).relevant ||
  hasRelevantTitle(item, search)
)

// const hasRelevantTags = (sound, relevantTags) => relevantTags &&
//   sound.tags &&
//   relevantTags.every(
//     tagGroup => tagGroup.some(
//       tag => sound.tags.indexOf(tag) !== -1
//     )
//   )

// const getRelevantTags = (tags, search) => {
//   const searchSplit = splitSearchPatterns(search)
//   return searchSplit.map(pattern => tags
//     .filter(tag => isRelevant(tag, pattern))
//     .map(tag => tag.name))
// }

export const getErrorsFilter = getFlag(memoizeSearch, 'filterErrors')
export const getUsedFilter = getFlag(memoizeSearch, 'filterUsed')

export const getBrowserLibrary = createSelector(
  memoizeBrowser,
  libraryStore.getCollection,
  (browser, libraries) => {
    if (browser.libraryUrl) {
      return browser.libraryUrl
    }
    return libraries.length > 0
      ? libraries[0].url
      : null
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

export const getBrowserModule = moduleStore.createFindSelector(getBrowserModuleUrl)

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
      return sounds.filter(sound => categories.every(category => category.sounds.indexOf(sound.uuid) === -1))
    }
    return sounds
  }
)

function flagSounds (sounds, categories) {
  return sounds.map(sound => ({
    ...sound,
    isUsed: categories.some(category => category.sounds.indexOf(sound.uuid) !== -1)
  }))
}

export const getGallerySoundList = createSelector(
  [
    filterUnusedSounds,
    getSoundSearchValueCleared,
    categoryStore.getAll,
    getErrorsFilter
  ],
  (sounds, search, categories, filterErrors) => {
    let soundsFiltered = sounds
    if (filterErrors) {
      soundsFiltered = soundsFiltered.filter(sound => !sound.error)
    }
    if (search) {
      soundsFiltered = soundsFiltered.filter(sound => isRelevant(sound, search))
    }
    return flagSounds(soundsFiltered, categories)
  }
)

export const getGalleryTarget = createSelector(
  memoizeTarget,
  state => state
)
