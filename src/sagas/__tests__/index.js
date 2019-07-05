import { getSagaTester } from '../../mock'

import * as logger from '../../clientLogger'
import mainSaga from '..'

describe('main project saga', () => {
  beforeEach(() => {
    jest.spyOn(logger, 'logWarning').mockImplementation()
    jest.spyOn(logger, 'logError').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('starts without errors', () => {
    const sagaTester = getSagaTester()
    expect(() => {
      sagaTester.run(mainSaga)
    }).not.toThrow()
  })
})
