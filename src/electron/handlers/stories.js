const { PATH_STORIES, PATH_WORKERS } = require('../paths')

const generateUuid = require('uuid/v4')
const jetpack = require('fs-jetpack')
const path = require('path')
const workerpool = require('workerpool')

const readStory = workerpool.pool(path.join(
  PATH_WORKERS,
  'readStory.js'
))

function storyUuidToFile (uuid) {
  return `${uuid}.json`
}

function storyUuidToFilePath (uuid) {
  return jetpack.path(PATH_STORIES, storyUuidToFile(uuid))
}

function fileToStoryUuid (file) {
  return file.substr(0, file.length - 5)
}

export function listStories () {
  return jetpack.listAsync(PATH_STORIES)
    .then(files => files ? files.map(fileToStoryUuid) : [])
    .then(uuids => Promise.all(uuids.map(uuid => readStory.exec('readStory', [uuid]))))
}

export function loadStory ({ payload }) {
  return readStory.exec('readStory', [payload])
}

export function removeStory ({ payload }) {
  return jetpack
    .removeAsync(storyUuidToFilePath(payload))
    .then(() => payload)
}

export function renameStory ({ payload }) {
  return loadStory({ payload: payload.uuid })
    .then(data => saveStory({
      payload: {
        ...data,
        name: payload.name
      }
    }))
}

export function saveStory ({ payload }) {
  const uuid = payload.uuid || generateUuid()
  const data = { ...payload, uuid }
  return jetpack
    .writeAsync(storyUuidToFilePath(uuid), data)
    .then(() => data)
}
