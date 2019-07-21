import { createEntityStore } from 'redux-entity-routines'

export const tagStore = createEntityStore('tags', {
  identAttr: 'name'
})
