import { moduleRoutines } from '../../soundModules/actions'
import { storyRoutines } from '../../soundStories/actions'
import { getActiveStory, storyStore } from '../../soundStories/store'

export async function loadLibrary (app, action) {
  const library = await app.workOn('readLibrary', action.payload)
  app.dispatch(moduleRoutines.load.request(library))
  const activeStory = storyStore.getObject(app.state, getActiveStory(app.state))
  if (
    activeStory &&
    (!activeStory.libraries || !activeStory.libraries.includes(library.url))
  ) {
    app.dispatch(
      storyRoutines.update.request({
        ...activeStory,
        libraries: [...(activeStory.libraries || []), library.url]
      })
    )
  }
  return library
}
