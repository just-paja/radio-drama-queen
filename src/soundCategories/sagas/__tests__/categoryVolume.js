import sagas from '..'
import getSagaTester from '../../../../mock/sagaTester'

import { categoryList } from '../../actions'
import { soundList } from '../../../sounds/actions'

describe('categoryVolume saga', () => {
  it('dispatches groupVolumeSet for all category sounds', () => {
    const sagaTester = getSagaTester({
      soundCategories: {
        list: [
          {
            uuid: 'foo',
            sounds: ['sound1', 'sound2'],
            volume: 1
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(categoryList.setVolume('foo', 25))
    expect(sagaTester.getCalledActions()).toContainEqual(soundList.groupVolumeSet(null, {
      sounds: ['sound1', 'sound2'],
      volume: 25
    }))
  })

  it('unmutes category on groupVolumeSet if muted', () => {
    const sagaTester = getSagaTester({
      soundCategories: {
        list: [
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
    sagaTester.dispatch(categoryList.setVolume('foo', 25))
    expect(sagaTester.numCalled(categoryList.UNMUTE)).toBe(1)
  })

  it('sets muted to true on category mute if not muted', () => {
    const sagaTester = getSagaTester({
      soundCategories: {
        list: [
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
    sagaTester.dispatch(categoryList.muteToggle('foo'))
    expect(sagaTester.getState().soundCategories.list).toContainEqual(expect.objectContaining({
      uuid: 'foo',
      muted: true
    }))
  })

  it('dispatches groupVolumeSet for all category sounds with volume 0 on mute if not muted', () => {
    const sagaTester = getSagaTester({
      soundCategories: {
        list: [
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
    sagaTester.dispatch(categoryList.muteToggle('foo'))
    expect(sagaTester.getCalledActions()).toContainEqual(soundList.groupVolumeSet(null, {
      sounds: ['sound1', 'sound2'],
      volume: 0
    }))
  })

  it('sets muted to false on category mute if muted', () => {
    const sagaTester = getSagaTester({
      soundCategories: {
        list: [
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
    sagaTester.dispatch(categoryList.muteToggle('foo'))
    expect(sagaTester.getState().soundCategories.list).toContainEqual(expect.objectContaining({
      uuid: 'foo',
      muted: false
    }))
  })

  it('dispatches groupVolumeSet for all category sounds with volume 0 same as category on mute if muted', () => {
    const sagaTester = getSagaTester({
      soundCategories: {
        list: [
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
    sagaTester.dispatch(categoryList.muteToggle('foo'))
    expect(sagaTester.getCalledActions()).toContainEqual(soundList.groupVolumeSet(null, {
      sounds: ['sound1', 'sound2'],
      volume: 0.75
    }))
  })
})
