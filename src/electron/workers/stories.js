const generateUuid = require('uuid/v4')
const jetpack = require('fs-jetpack')

const { PATH_STORIES } = require('../paths')

function fileToStoryUuid (file) {
  return file.substr(0, file.length - 5)
}

function storyUuidToFilePath (uuid) {
  return jetpack.path(PATH_STORIES, `${uuid}.json`)
}

function listStories () {
  return jetpack.listAsync(PATH_STORIES)
    .then(files => files ? files.map(fileToStoryUuid) : [])
    .then(uuids => Promise.all(uuids.map(readStory)))
}

function readStory (uuid) {
  if (!uuid) {
    return Promise.reject(new Error('Cannot read story. You must provide story uuid!'))
  }

  return jetpack
    .readAsync(storyUuidToFilePath(uuid), 'buffer')
    .then(text => ({ ...JSON.parse(text), uuid }))
}

function removeStory (uuid) {
  return jetpack
    .removeAsync(storyUuidToFilePath(uuid))
    .then(() => uuid)
}

function renameStory ({ uuid, name }) {
  return readStory(uuid).then(data => saveStory({
    ...data,
    name: name
  }))
}

function saveStory (story) {
  const data = story.uuid ? story : { ...story, uuid: generateUuid() }
  return jetpack
    .writeAsync(storyUuidToFilePath(data.uuid), data)
    .then(() => data)
}

module.exports = {
  listStories,
  readStory,
  removeStory,
  renameStory,
  saveStory
}
