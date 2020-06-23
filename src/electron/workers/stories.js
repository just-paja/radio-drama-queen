const { generateUuid } = require('../uuid')

const jetpack = require('fs-jetpack')

function fileToStoryUuid (file) {
  return file.substr(0, file.length - 5)
}

function storyUuidToFilePath (root, uuid) {
  return jetpack.path(root, `${uuid}.json`)
}

function listStories (app) {
  return jetpack
    .listAsync(app.paths.stories)
    .then(files => (files ? files.map(fileToStoryUuid) : []))
    .then(uuids => Promise.all(uuids.map(uuid => readStory(app, uuid))))
}

function readStory (app, uuid) {
  if (!uuid) {
    return Promise.reject(
      new Error('Cannot read story. You must provide story uuid!')
    )
  }

  return jetpack
    .readAsync(storyUuidToFilePath(app.paths.stories, uuid), 'buffer')
    .then(text => ({ ...JSON.parse(text), uuid }))
}

function removeStory (app, uuid) {
  return jetpack
    .removeAsync(storyUuidToFilePath(app.paths.stories, uuid))
    .then(() => uuid)
}

async function renameStory (app, { uuid, name }) {
  const story = await readStory(app, uuid)
  return await saveStory(app, {
    ...story,
    name
  })
}

async function updateStory (app, { uuid, ...patch }) {
  const story = await readStory(app, uuid)
  return await saveStory(app, {
    ...story,
    ...patch
  })
}

function saveStory (app, story) {
  const data = story.uuid ? story : { ...story, uuid: generateUuid() }
  return jetpack
    .writeAsync(storyUuidToFilePath(app.paths.stories, data.uuid), data)
    .then(() => data)
}

module.exports = {
  listStories,
  readStory,
  removeStory,
  renameStory,
  saveStory,
  updateStory
}
