import { all, put, select, takeEvery } from 'redux-saga/effects';

import { getTagByName } from '../../soundTags/selectors';
import { categoryList } from '../actions';
import { getAllUnusedSoundsByTag } from '../selectors';

function* addTagToCategory({ payload, meta: { uuid } }) {
  const tag = yield select(getTagByName, payload);
  if (tag) {
    const sounds = yield select(getAllUnusedSoundsByTag, payload);
    const soundUuids = sounds.map(sound => sound.uuid);
    yield all(soundUuids.map(soundUuid => put(categoryList.soundAdd(
      uuid,
      soundUuid
    ))));
  }
}

function* handleTagAdd() {
  yield takeEvery(categoryList.TAG_ADD, addTagToCategory);
}

export default [
  handleTagAdd,
];
