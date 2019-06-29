import AudioManager from '../../AudioManager'
import sagas from '..'

import { getSagaTester } from '../../../mock'
import { soundRoutines } from '../../actions'

describe('soundStop saga', () => {
  beforeEach(() => {
    jest.spyOn(AudioManager, 'stop').mockImplementation()
  })

  it('calls AudioManager stop on sound stop', () => {
    const sagaTester = getSagaTester()
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundRoutines.stop('foo'))
    expect(AudioManager.stop).toHaveBeenCalledWith('foo')
  })

  it('calls AudioManager stop for each uuid on sound group stop', () => {
    const sagaTester = getSagaTester()
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundRoutines.stop(['foo', 'bar']))
    expect(AudioManager.stop).toHaveBeenCalledWith('foo')
    expect(AudioManager.stop).toHaveBeenCalledWith('bar')
  })
})
