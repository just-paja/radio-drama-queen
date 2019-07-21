import { categoryStore } from '../store'
import { clearSearch, splitSearchPatterns, stringSearch } from '../../search'
import { createSelector } from 'reselect'
import { FORM_SOUND_ADD } from '../constants'
import { formValueSelector } from 'redux-form'
import { soundStore } from '../../sounds'
import { tagStore } from '../../soundTags'

const getFilterForm = formValueSelector(FORM_SOUND_ADD)

export const getSoundSearchValueCleared = createSelector(
  state => getFilterForm(state, 'filter'),
  value => clearSearch(value)
)

export const getSearchFragments = createSelector(
  getSoundSearchValueCleared,
  splitSearchPatterns
)

const isRelevant = (string, search, inclusive = false) => (
  stringSearch(string, search, inclusive).relevant
)

function flagSounds (sounds, tags) {
  return sounds.map(sound => ({
    ...sound,
    tags: sound.tags
      .map(tagName => tags.find(tag => tag.name === tagName))
      .filter(tag => tag)
  }))
}

const getRelevantTags = createSelector(
  tagStore.getAll,
  getSoundSearchValueCleared,
  function (tags, search) {
    if (search) {
      return tags.filter(tag => isRelevant(tag.title, search))
    }
    return tags
  }
)

function hasRelevantTags (sound, tags) {
  return tags.some(tag => sound.tags.indexOf(tag.name) !== -1)
}

const getUnusedSounds = createSelector(
  soundStore.getAll,
  categoryStore.getAll,
  (sounds, categories) => sounds.filter(sound => !categories.some(category => category.sounds.includes(sound.uuid)))
)

export const getFilteredSounds = createSelector(
  getUnusedSounds,
  tagStore.getAll,
  getRelevantTags,
  getSoundSearchValueCleared,
  (sounds, tags, relevantTags, search) => {
    let soundsFiltered = sounds
    if (search) {
      soundsFiltered = soundsFiltered.filter(sound =>
        isRelevant(sound.name, search) ||
        hasRelevantTags(sound, relevantTags)
      )
    }
    return flagSounds(soundsFiltered.slice(0, 63), tags)
  }
)
