function mapStories (storyNames) {
  return storyNames.map(storyName => ({
    name: storyName
  }))
}

export function listStories (storyManager) {
  return (messenger, routine, action) =>
    storyManager.listStories()
      .then(stories => messenger.sendMessage(routine.success(null, mapStories(stories))))
      .catch(error => messenger.sendMessage(routine.failure(null, error.message)))
}
