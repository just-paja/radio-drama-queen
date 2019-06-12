import sagas from '..'
import getSagaTester from '../../../../mock/sagaTester'

import AudioManager from '../../AudioManager'

import { soundList } from '../../actions'

describe('soundVolumeChange saga', () => {
  beforeEach(() => {
    jest.spyOn(AudioManager, 'findByUuid').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('sets sound volume to action payload divided by 100', () => {
    const sagaTester = getSagaTester({})
    const testHowl = {
      sound: {
        volume: jest.fn()
      }
    }
    AudioManager.findByUuid.mockReturnValue(testHowl)
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundList.volumeSet('foo', { volume: 25 }))
    expect(testHowl.sound.volume).toHaveBeenCalledWith(0.25)
  })

  it('does not fail when passed invalid uuid', () => {
    AudioManager.findByUuid.mockReturnValue(null)
    const sagaErrorHandler = {
      options: {
        onError: jest.fn()
      }
    }
    const sagaTester = getSagaTester({}, sagaErrorHandler)
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundList.volumeSet('foo', { volume: 25 }))
    expect(sagaErrorHandler.options.onError).not.toHaveBeenCalled()
  })

  it('sets sound volume to group of sounds by action divided by 100', () => {
    const sagaTester = getSagaTester({})
    const testHowl1 = {
      sound: {
        volume: jest.fn()
      }
    }
    const testHowl2 = {
      sound: {
        volume: jest.fn()
      }
    }
    AudioManager.findByUuid
      .mockReturnValueOnce(testHowl1)
      .mockReturnValueOnce(testHowl2)
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundList.groupVolumeSet(null, {
      volume: 25,
      sounds: ['foo', 'bar']
    }))
    expect(testHowl1.sound.volume).toHaveBeenCalledWith(0.25)
    expect(testHowl2.sound.volume).toHaveBeenCalledWith(0.25)
  })
})
