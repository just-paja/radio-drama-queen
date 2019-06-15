import { PATH_STORIES } from './paths'
import jetpack from 'fs-jetpack'

export class StoryManager {
  pathHome = PATH_STORIES

  storyNameToFile (storyName) {
    return `${storyName}.json`
  }

  storyNameToFilePath (storyName) {
    return jetpack.path(this.pathHome, this.storyNameToFile(storyName))
  }

  fileToStoryName (file) {
    return file.substr(0, file.length - 5)
  }

  listStories () {
    return jetpack.listAsync(this.pathHome).then(files => files
      ? files.map(this.fileToStoryName)
      : [])
  }

  loadStory (storyName) {
    return jetpack.readAsync(this.storyNameToFilePath(storyName))
  }

  saveStory (story) {
    return jetpack
      .writeAsync(this.storyNameToFilePath(story.name), story)
      .then(() => story)
  }
}
