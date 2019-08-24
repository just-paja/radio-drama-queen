import sagas from '..'
import boardSagas from '../../../soundBoards/sagas'

import { getSagaTester } from '../../../mock'
import { boardRoutines } from '../../../soundBoards'

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
    sagaTester.dispatch(boardRoutines.create.success({
      name: 'foo',
      uuid: 'uuid-test'
    }))
    expect(sagaTester.getState().soundWorkspaces.ui).toMatchObject({
      board: 'uuid-test',
      view: 'VIEW_BOARD'
    })
  })
})
