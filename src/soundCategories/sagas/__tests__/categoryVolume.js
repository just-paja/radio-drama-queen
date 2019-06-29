import sagas from '..'

import { getSagaTester } from '../../../mock'
import { categoryRoutines } from '../../actions'
import { soundRoutines } from '../../../sounds'

describe('categoryVolume saga', () => {
  it('dispatches setVolume for all category sounds', () => {
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
    sagaTester.dispatch(categoryRoutines.setVolume('foo', 25))
    expect(sagaTester.getCalledActions()).toContainEqual(soundRoutines.setVolume(['sound1', 'sound2'], {
      volume: 25
    }))
  })

  it('given muted is true, it unmutes category on setVolume', () => {
    const sagaTester = getSagaTester({
      entities: {
        categories: [
          {
            uuid: 'foo',
            sounds: ['sound1', 'sound2'],
            volume: 1,
            muted: true
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(categoryRoutines.setVolume('foo', 25))
    expect(sagaTester.getState()).toHaveProperty('entities.categories', [
      expect.objectContaining({
        uuid: 'foo',
        muted: false
      })
    ])
  })

  it('sets muted to true on category mute if not muted', () => {
    const sagaTester = getSagaTester({
      entities: {
        categories: [
          {
            uuid: 'foo',
            sounds: ['sound1', 'sound2'],
            volume: 0.75,
            muted: false
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(categoryRoutines.toggleMute('foo'))
    expect(sagaTester.getState()).toHaveProperty('entities.categories', [
      expect.objectContaining({
        uuid: 'foo',
        muted: true
      })
    ])
  })

  it('dispatches setVolume for all category sounds with volume 0 on mute if not muted', () => {
    const sagaTester = getSagaTester({
      entities: {
        categories: [
          {
            uuid: 'foo',
            sounds: ['sound1', 'sound2'],
            volume: 0.75,
            muted: false
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(categoryRoutines.toggleMute('foo'))
    expect(sagaTester.getCalledActions()).toContainEqual(
      soundRoutines.setVolume(['sound1', 'sound2'], { volume: 0 })
    )
  })

  it('sets muted to false on category mute if muted', () => {
    const sagaTester = getSagaTester({
      entities: {
        categories: [
          {
            uuid: 'foo',
            sounds: ['sound1', 'sound2'],
            volume: 0.75,
            muted: true
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(categoryRoutines.toggleMute('foo'))
    expect(sagaTester.getState()).toHaveProperty('entities.categories', [
      expect.objectContaining({
        uuid: 'foo',
        muted: false
      })
    ])
  })

  it('dispatches setVolume for all category sounds with volume 0 same as category on mute if muted', () => {
    const sagaTester = getSagaTester({
      entities: {
        categories: [
          {
            uuid: 'foo',
            sounds: ['sound1', 'sound2'],
            volume: 0.75,
            muted: true
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(categoryRoutines.toggleMute('foo'))
    expect(sagaTester.getCalledActions()).toContainEqual(soundRoutines.setVolume(['sound1', 'sound2'], {
      volume: 0.75
    }))
  })
})
