import { passPayload } from './workerConnection'

export const listStories = passPayload('listStories')
export const loadStory = passPayload('readStory')
export const removeStory = passPayload('removeStory')
export const renameStory = passPayload('renameStory')
export const saveStory = passPayload('saveStory')
