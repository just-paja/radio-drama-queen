import sagas from '..'
import boardSagas from '../../../soundBoards/sagas'
import getSagaTester from '../../../../mock/sagaTester'

import { soundBoard } from '../../../soundBoards/actions'

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
    sagaTester.dispatch(soundBoard.create({
      name: 'foo'
    }))
    expect(sagaTester.getState().soundWorkspaces.ui).toMatchObject({
      board: 'uuid-test',
      view: 'VIEW_BOARD'
    })
  })
})
