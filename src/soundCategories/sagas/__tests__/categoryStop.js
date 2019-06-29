import sagas from '..'

import { categoryRoutines } from '../../actions'
import { getSagaTester } from '../../../mock'
import { soundRoutines } from '../../../sounds'

describe('categoryStop saga', () => {
  it('dispatches group stop for all playing sounds in a category', () => {
    const sagaTester = getSagaTester({
      entities: {
        categories: [
          {
            uuid: 'category-1',
            sounds: ['sound-1', 'sound-2'],
            volume: 1
          }
        ],
        sounds: [
          {
            uuid: 'sound-1',
            playing: true
          },
          {
            uuid: 'sound-2',
            playing: true
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(categoryRoutines.stop('category-1'))
    expect(sagaTester.getCalledActions()).toContainEqual(
      soundRoutines.stop(['sound-1', 'sound-2'])
    )
  })

  it('dispatches group stop omitting not playing sounds in a category', () => {
    const sagaTester = getSagaTester({
      entities: {
        categories: [
          {
            uuid: 'category-1',
            sounds: ['sound-1', 'sound-2'],
            volume: 1
          }
        ],
        sounds: [
          {
            uuid: 'sound-1',
            playing: true
          },
          {
            uuid: 'sound-2',
            playing: false
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(categoryRoutines.stop('category-1'))
    expect(sagaTester.getCalledActions()).toContainEqual(
      soundRoutines.stop(['sound-1'])
    )
  })

  it('dispatches group stop omitting a passed exceptional sound uuid', () => {
    const sagaTester = getSagaTester({
      entities: {
        categories: [
          {
            uuid: 'category-1',
            sounds: ['sound-1', 'sound-2'],
            volume: 1
          }
        ],
        sounds: [
          {
            uuid: 'sound-1',
            playing: true
          },
          {
            uuid: 'sound-2',
            playing: true
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(categoryRoutines.stop('category-1', 'sound-2'))
    expect(sagaTester.getState()).toHaveProperty('entities.sounds', [
      {
        uuid: 'sound-1',
        playing: false
      },
      {
        uuid: 'sound-2',
        playing: true
      }
    ])
  })
})
