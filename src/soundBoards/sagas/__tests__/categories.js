import sagas from '..'
import categorySagas from '../../../soundCategories/sagas'

import { boardRoutines } from '../../actions'
import { getSagaTester } from '../../../mock'

describe('categoryCreate saga', () => {
  it('creates category on submit', () => {
    const sagaTester = getSagaTester({})
    sagaTester.runAll(sagas)
    sagaTester.runAll(categorySagas)
    sagaTester.dispatch(boardRoutines.createCategory('3'))
    expect(sagaTester.getState()).toHaveProperty('entities.categories', [
      expect.objectContaining({
        name: 'Unnamed',
        board: '3'
      })
    ])
  })
})
