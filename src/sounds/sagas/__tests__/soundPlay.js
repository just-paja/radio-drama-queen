import sagas from '..'
import getSagaTester from '../../../../mock/sagaTester'

import AudioManager from '../../AudioManager'

import { soundList } from '../../actions'

describe('soundPlay saga', () => {
  beforeEach(() => {
    jest.spyOn(AudioManager, 'play').mockImplementation()
    jest.spyOn(AudioManager, 'stop').mockImplementation()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('calls AudioManager play on sound play', () => {
    const sagaTester = getSagaTester({
      sounds: {
        list: [
          {
            uuid: 'foo',
            playing: false,
            loop: false
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundList.play('foo'))
    expect(AudioManager.play).toHaveBeenCalledWith('foo')
  })

  it('triggers sound finished action after sound finished playing', () => {
    const sagaTester = getSagaTester({
      sounds: {
        list: [
          {
            uuid: 'foo',
            playing: false,
            loop: false
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundList.play('foo'))
    expect(sagaTester.numCalled(soundList.FINISHED)).toBe(1)
  })

  it('triggers replays sound when it is still marked as playing and loop at the end of the cycle', () => {
    AudioManager.play.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)))
    const sagaTester = getSagaTester({
      sounds: {
        list: [
          {
            uuid: 'foo',
            playing: false,
            loop: true
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundList.play('foo'))
    jest.runTimersToTime(1000)
    sagaTester.updateState({
      sounds: {
        list: [
          {
            uuid: 'foo',
            playing: false,
            loop: true
          }
        ]
      }
    })
    return sagaTester.waitFor(soundList.PLAY)
      .then(() => sagaTester.dispatch(soundList.stop('foo')))
      .then(() => {
        expect(AudioManager.play).toHaveBeenCalledTimes(2)
      })
  })
})
