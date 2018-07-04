import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';
import MultiBackend from 'react-dnd-multi-backend';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { DragDropContextProvider } from 'react-dnd';
import { Provider } from 'react-redux';

import AppMenu from './containers/AppMenu';
import SoundCategoryGrid from './containers/SoundCategoryGrid';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <div className="App">
        <Provider store={store}>
          <DragDropContextProvider backend={MultiBackend(HTML5toTouch)}>
            <AppMenu />
            <SoundCategoryGrid />
          </DragDropContextProvider>
        </Provider>
      </div>
    );
  }
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
};

export default App;
