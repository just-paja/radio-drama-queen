import { call, select } from 'redux-saga/effects';

import { DEFAULT_CATEGORY_NAME } from '../constants';
import { getDefaultCategory } from '../selectors';
import { categoryCreateWithUuid } from './categoryCreate';

export function* createDefaultCategory() {
  const category = yield select(getDefaultCategory);
  if (!category) {
    return yield call(categoryCreateWithUuid, {
      payload: {
        name: DEFAULT_CATEGORY_NAME,
      },
    });
  }
  return category;
}

export default [];
