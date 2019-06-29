import sagas from '..'

import { boardRoutines } from '../../actions'
import { getSagaTester } from '../../../mock'
import { initialize } from 'redux-form'

describe('categoryCreate saga', () => {
  it('creates category on submit', () => {
    const sagaTester = getSagaTester({})
    sagaTester.runAll(sagas)
    sagaTester.dispatch(initialize('boardRoutines', {
      name: 'foo'
    }))
    sagaTester.dispatch(boardRoutines.createCategory({ name: 'foo' }, { board: '3' }))
    expect(sagaTester.getState()).toHaveProperty('entities.categories', [
      expect.objectContaining({
        name: 'foo'
      })
    ])
  })
})
