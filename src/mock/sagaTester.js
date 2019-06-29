import SagaTester from 'redux-saga-tester'
import reducers from '../reducers'

import { all, call } from 'redux-saga/effects'

export default (initialState, extraConfig = {}) => {
  const sagaTester = new SagaTester({
    ...extraConfig,
    reducers,
    initialState
  })
  sagaTester.runAll = (sagas) => {
    function * combinedSaga () {
      try {
        yield all(sagas.map(saga => call(saga)))
      } catch (e) {
        if (extraConfig.options && extraConfig.options.onError) {
          extraConfig.options.onError(e)
        } else {
          throw e
        }
      }
    }
    sagaTester.run(combinedSaga)
  }
  return sagaTester
}
