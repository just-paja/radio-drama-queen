import { passPayload } from './workerConnection'
import { uiRoutines } from '../../ui/actions'
import { libraryRoutines } from '../../soundLibraries/actions'

export const listStories = passPayload('listStories')
export const removeStory = passPayload('removeStory')
export const renameStory = passPayload('renameStory')
export const saveStory = passPayload('saveStory')
export const updateStory = passPayload('updateStory')
export async function loadStory (app, action) {
  const story = await app.workOn('readStory', action.payload)
  if (story.libraries) {
    app.dispatch(uiRoutines.purge.success())
    for (const library of story.libraries) {
      app.dispatch(libraryRoutines.load.request({ url: library }))
    }
  }
  return story
}
