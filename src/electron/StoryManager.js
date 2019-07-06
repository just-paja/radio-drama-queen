import { PATH_STORIES, PATH_WORKERS } from './paths'

import generateUuid from 'uuid/v4'
import jetpack from 'fs-jetpack'
import path from 'path'
import workerpool from 'workerpool'

const readStory = workerpool.pool(path.join(
  PATH_WORKERS,
  'readStory.js'
))

export class StoryManager {
  pathHome = PATH_STORIES

  storyUuidToFile (uuid) {
    return `${uuid}.json`
  }

  storyUuidToFilePath (uuid) {
    return jetpack.path(this.pathHome, this.storyUuidToFile(uuid))
  }

  fileToStoryUuid (file) {
    return file.substr(0, file.length - 5)
  }

  listStories () {
    return jetpack.listAsync(this.pathHome)
      .then(files => files ? files.map(this.fileToStoryUuid) : [])
      .then(uuids => Promise.all(uuids.map(uuid => readStory.exec('readStory', [uuid]))))
  }

  loadStory (uuid) {
    return readStory.exec('readStory', [uuid])
  }

  saveStory (story) {
    const uuid = story.uuid || generateUuid()
    return jetpack
      .writeAsync(this.storyUuidToFilePath(uuid), { ...story, uuid })
      .then(() => story)
  }
}
