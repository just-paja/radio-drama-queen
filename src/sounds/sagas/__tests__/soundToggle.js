import AudioManager from '../../AudioManager'
import sagas from '..'

import { getSagaTester } from '../../../mock'
import { soundRoutines } from '../../actions'

describe('soundToggle saga', () => {
  beforeEach(() => {
    jest.spyOn(AudioManager, 'play').mockImplementation()
    jest.spyOn(AudioManager, 'stop').mockImplementation()
  })

  it('dispatches play action when sound is not playing', () => {
    const sagaTester = getSagaTester({
      entities: {
        sounds: [
          {
            uuid: 'foo',
            playing: false
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundRoutines.toggle('foo'))
    expect(sagaTester.numCalled(soundRoutines.play.TRIGGER)).toBe(1)
  })

  it('dispatches stop action when sound is playing', () => {
    const sagaTester = getSagaTester({
      entities: {
        sounds: [
          {
            uuid: 'foo',
            playing: true
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundRoutines.toggle('foo'))
    expect(sagaTester.numCalled(soundRoutines.toggle.TRIGGER)).toBe(1)
  })
})
