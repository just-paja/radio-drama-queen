import { boardStore } from '../../soundBoards/store'
import { generateUuid } from '../uuid'
import { getLargestNameNumber } from './naming'

export function createBoard (app, action) {
  const maxNumber = getLargestNameNumber(boardStore.getAll(app.state))
  return Promise.resolve({
    name: `Board ${maxNumber + 1}`,
    uuid: generateUuid()
  })
}

export function renameBoard (app, action) {
  return Promise.resolve(action.payload)
}

export function removeBoard (app, action) {
  return Promise.resolve(action.payload)
}
