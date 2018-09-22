import generateUuid from 'uuid/v4';

import { put } from 'redux-saga/effects';

import { soundList } from '../actions';

export const getNameWithoutExtension = filePath => filePath
  .split('/')
  .filter((part, index, source) => index === source.length - 1)
  .join('/')
  .split('.')
  .filter((part, index, source) => index !== source.length - 1)
  .join('.');

export function* registerSound(resource) {
  const uuid = generateUuid();
  const path = typeof resource === 'string' ? resource : resource.path;
  yield put(soundList.add({
    name: resource.name || getNameWithoutExtension(path),
    tags: resource.tags || [],
    path,
    uuid,
  }));
  return uuid;
}
