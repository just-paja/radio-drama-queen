import sagas from '..'

import { categoryRoutines } from '../../actions'
import { getSagaTester } from '../../../mock'

describe('categoryLoopToggle saga', () => {
  it('given loop is off, switches all sounds loop to on', () => {
    const sagaTester = getSagaTester({
      entities: {
        categories: [
          {
            uuid: 'category-1',
            sounds: ['sound-1', 'sound-2'],
            loop: false,
            volume: 1
          }
        ],
        sounds: [
          {
            uuid: 'sound-1',
            loop: false
          },
          {
            uuid: 'sound-2',
            loop: true
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(categoryRoutines.toggleLoop('category-1'))
    expect(sagaTester.getState()).toHaveProperty('entities.sounds', [
      {
        uuid: 'sound-1',
        loop: true
      },
      {
        uuid: 'sound-2',
        loop: true
      }
    ])
  })

  it('given loop is on, switches all sounds loop to off', () => {
    const sagaTester = getSagaTester({
      entities: {
        categories: [
          {
            uuid: 'category-1',
            sounds: ['sound-1', 'sound-2'],
            exclusive: false,
            loop: true,
            volume: 1
          }
        ],
        sounds: [
          {
            uuid: 'sound-1',
            loop: false
          },
          {
            uuid: 'sound-2',
            loop: true
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(categoryRoutines.toggleLoop('category-1'))
    expect(sagaTester.getState()).toHaveProperty('entities.sounds', [
      {
        uuid: 'sound-1',
        loop: false
      },
      {
        uuid: 'sound-2',
        loop: false
      }
    ])
  })

  it('does not fail when given non-existent category', () => {
    const onError = jest.fn()
    const sagaTester = getSagaTester({
      entities: {
        categories: []
      }
    }, {
      options: { onError }
    })
    expect(() => {
      sagaTester.runAll(sagas)
      sagaTester.dispatch(categoryRoutines.toggleLoop('category-1'))
    }).not.toThrow()
    expect(onError).not.toHaveBeenCalled()
  })
})
