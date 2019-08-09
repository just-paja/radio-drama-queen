import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'
import MultiBackend from 'react-dnd-multi-backend'
import PropTypes from 'prop-types'
import React from 'react'

import { DragDropContextProvider } from 'react-dnd'
import { OpenLibraryDialog } from './soundLibraries/components'
import { Provider } from 'react-redux'
import { StoryCreateDialog } from './soundStories/components'
import { SoundEditDialog } from './sounds/components'
import { theme } from './theme'
import { ThemeProvider, withStyles } from '@material-ui/styles'
import { WorkspaceLoadDialog, WorkspaceSaveDialog, WorkspaceView } from './soundWorkspaces/components'

const styles = theme => ({
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
    },
    ':focus': theme.components.focus
  },
  app: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

const ThemedApp = withStyles(styles)(({ classes }) => (
  <div className={classes.app}>
    <DragDropContextProvider backend={MultiBackend(HTML5toTouch)}>
      <WorkspaceView />
      <OpenLibraryDialog />
      <SoundEditDialog />
      <StoryCreateDialog />
      <WorkspaceLoadDialog />
      <WorkspaceSaveDialog />
    </DragDropContextProvider>
  </div>
))

class App extends React.Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={this.props.store}>
          <ThemedApp />
        </Provider>
      </ThemeProvider>
    )
  }
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired
}

export default App
