import { createEntityStore } from '../entities'
import { tagRoutines } from './actions'

export const tagStore = createEntityStore('tags', {
  identAttr: 'name',
  providedBy: [tagRoutines.register]
})
