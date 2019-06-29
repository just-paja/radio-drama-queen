import AudioManager from '../../AudioManager'
import sagas from '..'

import { getSagaTester } from '../../../mock'
import { soundRoutines } from '../../actions'

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
      entities: {
        sounds: [
          {
            uuid: 'foo',
            playing: false,
            loop: false
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundRoutines.play('foo'))
    expect(AudioManager.play).toHaveBeenCalledWith('foo')
  })

  it('triggers sound finished action after sound finished playing', () => {
    const sagaTester = getSagaTester({
      entities: {
        sounds: [
          {
            uuid: 'foo',
            playing: false,
            loop: false
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundRoutines.play('foo'))
    expect(sagaTester.numCalled(soundRoutines.play.FULFILL)).toBe(1)
  })

  it('triggers replays sound when it is still marked as playing and loop at the end of the cycle', () => {
    AudioManager.play.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)))
    const sagaTester = getSagaTester({
      entities: {
        sounds: [
          {
            uuid: 'foo',
            playing: false,
            loop: true
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundRoutines.play('foo'))
    jest.runTimersToTime(2000)
    sagaTester.updateState({
      entities: {
        sounds: [
          {
            uuid: 'foo',
            playing: false,
            loop: true
          }
        ]
      }
    })
    return sagaTester.waitFor(soundRoutines.play.TRIGGER)
      .then(() => sagaTester.dispatch(soundRoutines.stop('foo')))
      .then(() => {
        expect(AudioManager.play).toHaveBeenCalledTimes(2)
      })
  })
})
