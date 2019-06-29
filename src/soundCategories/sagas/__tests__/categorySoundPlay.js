import sagas from '..'

import { categoryRoutines } from '../../actions'
import { getSagaTester } from '../../../mock'
import { soundRoutines } from '../../../sounds'

describe('categorySoundPlay saga', () => {
  it('stops all sound related categories that are exclusive', () => {
    const sagaTester = getSagaTester({
      entities: {
        categories: [
          {
            uuid: 'category-1',
            sounds: ['sound-1', 'sound-2'],
            exclusive: true,
            volume: 1
          },
          {
            uuid: 'category-2',
            sounds: ['sound-3', 'sound-1'],
            volume: 0.5,
            exclusive: true
          },
          {
            uuid: 'category-3',
            sounds: ['sound-4', 'sound-1'],
            volume: 0.5,
            exclusive: false
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundRoutines.play('sound-1'))
    expect(sagaTester.getCalledActions()).toContainEqual(
      categoryRoutines.stop('category-1', 'sound-1')
    )
    expect(sagaTester.getCalledActions()).toContainEqual(
      categoryRoutines.stop('category-2', 'sound-1')
    )
  })
})
