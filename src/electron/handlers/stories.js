const { PATH_STORIES } = require('../paths')

const generateUuid = require('uuid/v4')
const jetpack = require('fs-jetpack')

function storyUuidToFile (uuid) {
  return `${uuid}.json`
}

function storyUuidToFilePath (uuid) {
  return jetpack.path(PATH_STORIES, storyUuidToFile(uuid))
}

function fileToStoryUuid (file) {
  return file.substr(0, file.length - 5)
}

export function listStories (action, messenger) {
  return jetpack.listAsync(PATH_STORIES)
    .then(files => files ? files.map(fileToStoryUuid) : [])
    .then(uuids => Promise.all(uuids.map(uuid => messenger.exec('readStory', [uuid]))))
}

export function loadStory ({ payload }, messenger) {
  return messenger.exec('readStory', [payload])
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
