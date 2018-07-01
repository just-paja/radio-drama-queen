import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import sagas from './sagas';

import configureStore from './store';

const store = configureStore({});

const render = (RootComponent) => {
  ReactDOM.render(
    <RootComponent store={store} />,
    document.getElementById('root')
  );
};

let sagaTask;

const startUp = () => {
  store.runSaga(sagas);
  render(App);
};

startUp();

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    render(require('./App').default);
  });
  module.hot.accept('./sagas', () => {
    // eslint-disable-next-line global-require
    const reloadSagas = require('./sagas').default;
    sagaTask.cancel();
    sagaTask.done.then(() => {
      sagaTask = store.runSaga(reloadSagas);
    });
  });
}
