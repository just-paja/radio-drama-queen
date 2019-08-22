const jetpack = require('fs-jetpack')

const { PATH_STORIES } = require('../paths')

function storyUuidToFilePath (uuid) {
  return jetpack.path(PATH_STORIES, `${uuid}.json`)
}

function readStory (uuid) {
  if (!uuid) {
    return Promise.reject(new Error('Cannot read story. You must provide story uuid!'))
  }

  return jetpack
    .readAsync(storyUuidToFilePath(uuid), 'buffer')
    .then(text => ({ ...JSON.parse(text), uuid }))
}

module.exports = {
  readStory
}
