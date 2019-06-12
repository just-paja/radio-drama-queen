import { createSelector } from 'reselect'

const memoizeGridState = state => state.soundCategories.grid

export const isCategoryCreateFormVisible = createSelector(
  memoizeGridState,
  state => state.showCreateForm
)

export default { isCategoryCreateFormVisible }
