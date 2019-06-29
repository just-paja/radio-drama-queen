import sagas from '..'
import boardSagas from '../../../soundBoards/sagas'

import { getSagaTester } from '../../../mock'
import { boardRoutines } from '../../../soundBoards'

jest.mock('uuid/v4', () => ({
  __esModule: true,
  default: () => 'uuid-test'
}))

describe('showBoardOnCreate saga', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('shows board when it is created', () => {
    const sagaTester = getSagaTester({
      soundWorkspaces: {
        ui: {
          board: null,
          view: 'VIEW_LIBRARY'
        }
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.runAll(boardSagas)
    sagaTester.dispatch(boardRoutines.create({
      name: 'foo'
    }))
    expect(sagaTester.getState().soundWorkspaces.ui).toMatchObject({
      board: 'uuid-test',
      view: 'VIEW_BOARD'
    })
  })
})
