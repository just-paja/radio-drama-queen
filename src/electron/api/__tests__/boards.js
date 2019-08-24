import { startBackend } from '..'
import { boardRoutines } from '../../../soundBoards/actions'

jest.mock('electron', () => ({
  ipcMain: {
    on: jest.fn()
  }
}))

describe('Boards handler', () => {
  let app = null
  let targetWindow = null

  beforeEach(() => {
    targetWindow = {
      webContents: {
        send: jest.fn()
      }
    }
    app = startBackend(targetWindow)
  })

  afterEach(() => {
    app.terminate()
  })

  it('createBoard creates new board', () => {
    return app.handleIncomingAction(boardRoutines.create.request()).then(results => {
      expect(results).toContainEqual(
        boardRoutines.create.success(expect.objectContaining({
          name: 'Board 1'
        }))
      )
    })
  })

  it('createBoard creates board with incrementing number', () => {
    app.state.entities.boards = [
      {
        name: 'Board 1',
        uuid: 'board-xx'
      }
    ]
    return app.handleIncomingAction(boardRoutines.create.request()).then(() => {
      expect(app.state).toHaveProperty('entities.boards', expect.arrayContaining([
        expect.objectContaining({
          name: 'Board 2'
        })
      ]))
    })
  })

  it('createBoard creates board with number on given no other board ends with number', () => {
    app.state.entities.boards = [
      {
        name: 'Board xx',
        uuid: 'board-xx'
      },
      {
        name: 'Board zz',
        uuid: 'board-zz'
      }
    ]
    return app.handleIncomingAction(boardRoutines.create.request()).then(() => {
      expect(app.state).toHaveProperty('entities.boards', expect.arrayContaining([
        expect.objectContaining({
          name: 'Board 1'
        })
      ]))
    })
  })

  it('renameBoard renames board', () => {
    app.state.entities.boards = [
      {
        name: 'Board 1',
        uuid: 'board-xx'
      }
    ]
    return app.handleIncomingAction(boardRoutines.rename.request({
      name: 'Board xx',
      uuid: 'board-xx'
    })).then(() => {
      expect(app.state).toHaveProperty('entities.boards', [
        expect.objectContaining({
          name: 'Board xx',
          uuid: 'board-xx'
        })
      ])
    })
  })

  it('removeBoard removes board', () => {
    app.state.entities.boards = [
      {
        name: 'Board 1',
        uuid: 'board-xx'
      }
    ]
    return app.handleIncomingAction(boardRoutines.remove.request('board-xx')).then(() => {
      expect(app.state).toHaveProperty('entities.boards', [])
    })
  })
})
