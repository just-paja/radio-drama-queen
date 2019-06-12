import { call, select } from 'redux-saga/effects'

import { getBoardTargetCategory } from '../selectors'
import { createCategory } from '../../soundCategories/sagas'

export function * createDefaultCategory (boardUuid) {
  const category = yield select(getBoardTargetCategory, boardUuid)
  if (!category) {
    return yield call(createCategory, {
      payload: {
        name: null,
        board: boardUuid
      }
    })
  }
  return category
}

export function * createUnnamedCategory (boardUuid) {
  return yield call(createCategory, {
    payload: {
      name: 'Unnamed',
      board: boardUuid
    }
  })
}

export default []
