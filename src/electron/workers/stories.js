const { generateUuid } = require('../uuid')

const jetpack = require('fs-jetpack')

function fileToStoryUuid (file) {
  return file.substr(0, file.length - 5)
}

function storyUuidToFilePath (root, uuid) {
  return jetpack.path(root, `${uuid}.json`)
}

function listStories (config) {
  return jetpack
    .listAsync(config.paths.stories)
    .then(files => (files ? files.map(fileToStoryUuid) : []))
    .then(uuids => Promise.all(uuids.map(uuid => readStory(config, uuid))))
}

function readStory (config, uuid) {
  if (!uuid) {
    return Promise.reject(
      new Error('Cannot read story. You must provide story uuid!')
    )
  }

  return jetpack
    .readAsync(storyUuidToFilePath(config.paths.stories, uuid), 'buffer')
    .then(text => ({ ...JSON.parse(text), uuid }))
}

function removeStory (config, uuid) {
  return jetpack
    .removeAsync(storyUuidToFilePath(config.paths.stories, uuid))
    .then(() => uuid)
}

function renameStory (config, { uuid, name }) {
  return readStory(config, uuid).then(data =>
    saveStory({
      ...data,
      name: name
    })
  )
}

function saveStory (config, story) {
  const data = story.uuid ? story : { ...story, uuid: generateUuid() }
  return jetpack
    .writeAsync(storyUuidToFilePath(config.paths.stories, data.uuid), data)
    .then(() => data)
}

module.exports = {
  listStories,
  readStory,
  removeStory,
  renameStory,
  saveStory
}
