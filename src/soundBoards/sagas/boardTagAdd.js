import {
  all,
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import { soundBoard } from '../actions';
import { soundList } from '../../sounds/actions';
import { getBoardCategoryByName } from '../selectors';
import { createCategory } from '../../soundCategories/sagas';
import { categoryList } from '../../soundCategories/actions';
import { getTagByName } from '../../tags/selectors';
import { getAllUnusedSoundsByTag } from '../../soundCategories/selectors';

function* addTag({ payload, meta: { uuid } }) {
  const tag = yield select(getTagByName, payload);
  if (tag) {
    const sounds = yield select(getAllUnusedSoundsByTag, payload);
    const soundUuids = sounds.map(sound => sound.uuid);
    const categoryName = (tag.title && tag.title.cs) || tag.name;
    const category = yield select(getBoardCategoryByName, uuid, categoryName);
    if (category) {
      yield all(soundUuids.map(soundUuid => put(categoryList.soundAdd(
        category.uuid,
        soundUuid
      ))));
    } else {
      yield call(createCategory, {
        payload: {
          name: categoryName,
          board: uuid,
          sounds: soundUuids,
        },
      });
    }
    yield all(soundUuids.map(soundUuid => put(soundList.loadTrigger(soundUuid))));
  }
}

function* handleTagAdd() {
  yield takeEvery(soundBoard.TAG_ADD, addTag);
}

export default [
  handleTagAdd,
];
