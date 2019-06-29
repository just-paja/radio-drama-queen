import { categoryStore } from '../soundCategories'
import { createSelector } from 'reselect'
import { getCategoriesWithStatus } from '../soundCategories/selectors'
import { boardStore } from './store'

export const getBoardsWithStatus = createSelector(
  [boardStore.getAll, getCategoriesWithStatus],
  (boards, categories) => boards.map(board => ({
    ...board,
    playing: categories.filter(category => (
      category.board === board.uuid &&
      category.playing
    )).length > 0
  }))
)

export const findBoard = (boards, boardUuid) => boards.find(
  board => board.uuid === boardUuid
)

export const getBoardCategories = createSelector(
  categoryStore.getAll,
  (state, boardUuid) => boardUuid,
  (categories, boardUuid) => categories.filter(category => category.board === boardUuid)
)

export const getBoardCategoryByName = createSelector(
  (state, boardUuid, categoryName) => getBoardCategories(state, boardUuid)
    .find(category => category.name === categoryName),
  category => category
)

export const getBoardCategoryUuids = createSelector(
  getBoardCategories,
  categories => categories.map(category => category.uuid)
)

export const getBoardDefaultCategory = createSelector(
  getBoardCategories,
  categories => categories.find(category => category.name === null)
)

export const getBoardCategoryOldest = createSelector(
  getBoardCategories,
  categories => categories[0]
)

export const getBoardTargetCategory = createSelector(
  [getBoardDefaultCategory, getBoardCategoryOldest],
  (defaultCategory, oldestCategory) => defaultCategory || oldestCategory
)
