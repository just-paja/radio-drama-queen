import sagas from '..'
import getSagaTester from '../../../../mock/sagaTester'

import { categoryList } from '../../actions'
import { soundList } from '../../../sounds/actions'

describe('categorySoundPlay saga', () => {
  it('stops all sound related categories that are exclusive', () => {
    const sagaTester = getSagaTester({
      soundCategories: {
        list: [
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
    sagaTester.dispatch(soundList.play('sound-1'))
    expect(sagaTester.getCalledActions()).toContainEqual(
      categoryList.stop('category-1', 'sound-1')
    )
    expect(sagaTester.getCalledActions()).toContainEqual(
      categoryList.stop('category-2', 'sound-1')
    )
  })
})
