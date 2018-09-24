import { call, select } from 'redux-saga/effects';

import { getBoardTargetCategory } from '../selectors';
import { categoryCreateWithUuid } from '../../soundCategories/sagas';

export function* createDefaultCategory(boardUuid) {
  const category = yield select(getBoardTargetCategory, boardUuid);
  if (!category) {
    return yield call(categoryCreateWithUuid, {
      payload: {
        name: null,
        board: boardUuid,
      },
    });
  }
  return category;
}

export default [];
