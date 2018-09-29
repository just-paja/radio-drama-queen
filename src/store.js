import createSagaMiddleware from 'redux-saga';

// eslint-disable-next-line import/no-extraneous-dependencies
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './reducers';

export const sagaMiddleware = createSagaMiddleware();

const DEVELOPMENT = process.env.NODE_ENV !== 'production'; // eslint-disable-line no-undef
let store;

export default function configureStore(initialState = {}) {
  const middlewares = [];

  middlewares.push(sagaMiddleware);

  if (DEVELOPMENT) {
    middlewares.push(createLogger({
      collapsed: true,
      diff: false,
    }));
  }

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  store = createStore(
    reducers,
    initialState,
    compose(...enhancers)
  );

  // Create hook for async sagas
  store.sagaMiddleware = sagaMiddleware;
  store.runSaga = sagaMiddleware.run;
  return store;
}

module.hot.accept('./reducers', () => {
  if (store) {
    // eslint-disable-next-line global-require
    store.replaceReducer(require('./reducers').default);
    console.info(':: Hot reload reducers');
  }
});
