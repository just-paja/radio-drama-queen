import {
  all,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import { categoryList } from '../actions';
import { soundList } from '../../sounds/actions';
import { getCategory } from '../selectors';

function* toggleCategoryLoop({ meta: { uuid } }) {
  const category = yield select(getCategory, uuid);
  if (category) {
    const { loop, sounds } = category;
    yield all(sounds.map(sound => put(loop
      ? soundList.loopOn(sound)
      : soundList.loopOff(sound))));
  }
}

export function* handleCategoryLoopToggle() {
  yield takeEvery(categoryList.LOOP_TOGGLE, toggleCategoryLoop);
}

export default [
  handleCategoryLoopToggle,
];
