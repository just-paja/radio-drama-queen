import { createSelector } from 'reselect'

const memoizeTagList = state => state.soundTags.list

export const getTagByName = createSelector(
  (state, name) => memoizeTagList(state).find(tag => tag.name === name),
  tag => tag
)

export const getTags = createSelector(memoizeTagList, state => state)

export const getLanguages = createSelector(
  memoizeTagList,
  list => list.reduce((aggr, item) => (
    aggr.indexOf(item.language) === -1 ? [...aggr, item.langugage] : aggr),
  []
  )
)
