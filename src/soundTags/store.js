import { createEntityStore } from 'redux-entity-store'

export const tagStore = createEntityStore({
  name: 'tags',
  identSource: 'name'
})
