import generateUuid from 'uuid/v4'

import { boardStore } from '../../soundBoards/store'

export function createBoard (app, action) {
  const boards = boardStore.getAll(app.getState())
  const maxNumber = boards.reduce((number, board) => {
    const boardNumber = parseInt(board.name.split(' ').pop(), 10)
    return isNaN(boardNumber) || boardNumber < number ? number : boardNumber
  }, 0)
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
