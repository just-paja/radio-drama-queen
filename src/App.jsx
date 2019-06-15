import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'
import MultiBackend from 'react-dnd-multi-backend'
import PropTypes from 'prop-types'
import React from 'react'

import { DragDropContextProvider } from 'react-dnd'
import { OpenLibraryDialog } from './soundModules/components'
import { Provider } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import {
  SoundLibraryStatus,
  WorkspaceLoadDialog,
  WorkspaceSaveDialog,
  WorkspaceView
} from './soundWorkspaces/components'

const styles = {
  '@global': {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: 'sans-serif'
    },
    'html, body, #root, #wrapper': {
      minHeight: '100%',
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column'
    }
  },
  app: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
}

class App extends React.Component {
  render () {
    const { classes, store } = this.props
    return (
      <div className={classes.app}>
        <Provider store={store}>
          <DragDropContextProvider backend={MultiBackend(HTML5toTouch)}>
            <WorkspaceView />
            <OpenLibraryDialog />
            <SoundLibraryStatus />
            <WorkspaceLoadDialog />
            <WorkspaceSaveDialog />
          </DragDropContextProvider>
        </Provider>
      </div>
    )
  }
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired
}

export default withStyles(styles)(App)
