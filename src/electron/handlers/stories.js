export function listStories (action, messenger) {
  return messenger.exec('listStories', [])
}

export function loadStory ({ payload }, messenger) {
  return messenger.exec('readStory', [payload])
}

export function removeStory ({ payload }, messenger) {
  return messenger.exec('removeStory', [payload])
}

export function renameStory ({ payload }, messenger) {
  return messenger.exec('renameStory', [payload])
}

export function saveStory ({ payload }, messenger) {
  return messenger.exec('saveStory', [payload])
}
