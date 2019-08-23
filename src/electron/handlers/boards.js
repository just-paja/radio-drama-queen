import generateUuid from 'uuid/v4'

import { passPayload } from './workerConnection'
import { boardStore } from '../../soundBoards/store'

export function createBoard(action, messenger) {
  const boards = boardStore.getAll(messenger.getState())
  const maxNumber = boards.reduce((number, board) => {
    const boardNumber = parseInt(board.name.split(' ').pop(), 10)
    return isNaN(boardNumber) || boardNumber < number ? number : boardNumber
  }, 0)
  return Promise.resolve({
    name: `Board ${maxNumber + 1}`,
    uuid: generateUuid()
  })
}

export function renameBoard(action) {
  return Promise.resolve(action.payload)
}

export function removeBoard(action) {
  return Promise.resolve(action.payload)
}
