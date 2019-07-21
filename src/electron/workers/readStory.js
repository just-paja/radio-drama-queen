const jetpack = require('fs-jetpack')
const workerpool = require('workerpool')

const { PATH_STORIES } = require('../paths')

function storyUuidToFilePath (uuid) {
  return jetpack.path(PATH_STORIES, `${uuid}.json`)
}

workerpool.worker({
  readStory: (uuid) => {
    if (!uuid) {
      return Promise.reject(new Error('Cannot read story. You must provide story uuid!'))
    }

    return jetpack
      .readAsync(storyUuidToFilePath(uuid), 'buffer')
      .then(text => ({ ...JSON.parse(text), uuid }))
  }
})
