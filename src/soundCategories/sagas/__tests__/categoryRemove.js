import sagas from '..'

import { categoryRoutines } from '../../actions'
import { getSagaTester } from '../../../mock'

describe('categoryRemove saga', () => {
  it('removes the category from existence', () => {
    const sagaTester = getSagaTester({
      entities: {
        categories: [
          {
            uuid: 'foo',
            sounds: ['sound1', 'sound2'],
            volume: 1
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(categoryRoutines.remove('foo'))
    expect(sagaTester.getState()).toHaveProperty('entities.categories', [])
  })
})
