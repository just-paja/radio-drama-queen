// eslint-disable-next-line import/no-extraneous-dependencies
import SagaTester from 'redux-saga-tester';

import { all, fork } from 'redux-saga/effects';

import reducers from '../src/reducers';

export default (initialState) => {
  const sagaTester = new SagaTester({
    reducers,
    initialState,
  });
  sagaTester.runAll = (sagas) => {
    function* combinedSaga() {
      yield all(sagas.map(saga => fork(saga)));
    }
    sagaTester.run(combinedSaga);
  };
  return sagaTester;
};
