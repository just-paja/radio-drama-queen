import { createEntityStore } from '../entities'

export const tagStore = createEntityStore('tags', {
  identAttr: 'name'
})
