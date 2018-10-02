// eslint-disable-next-line import/no-extraneous-dependencies
import SagaTester from 'redux-saga-tester';

import { all, call } from 'redux-saga/effects';

import reducers from '../src/reducers';

export default (initialState, extraConfig = {}) => {
  const sagaTester = new SagaTester({
    ...extraConfig,
    reducers,
    initialState,
  });
  sagaTester.runAll = (sagas) => {
    function* combinedSaga() {
      try {
        yield all(sagas.map(saga => call(saga)));
      } catch (e) {
        if (extraConfig.options && extraConfig.options.onError) {
          extraConfig.options.onError(e);
        } else {
          throw e;
        }
      }
    }
    sagaTester.run(combinedSaga);
  };
  return sagaTester;
};
