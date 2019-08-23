function passPayload (workerName) {
  return function (action, messenger) {
    return messenger.workerPool.exec(workerName, [action.payload])
  }
}

export const listStories = passPayload('listStories')
export const loadStory = passPayload('readStory')
export const removeStory = passPayload('removeStory')
export const renameStory = passPayload('renameStory')
export const saveStory = passPayload('saveStory')
