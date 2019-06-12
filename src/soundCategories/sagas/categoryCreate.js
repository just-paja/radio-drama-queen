import generateUuid from 'uuid/v4'

import { put } from 'redux-saga/effects'

import { categoryList } from '../actions'

export function * createCategory ({ payload }) {
  const category = {
    ...payload,
    uuid: generateUuid(),
    sounds: payload.sounds || []
  }
  yield put(categoryList.add(category))
  return category
}

export default []
