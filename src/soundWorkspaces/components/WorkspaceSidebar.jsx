import React from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { getActiveStoryName } from '../selectors'
import { MainMenu } from './MainMenu'
import { SoundBoardSelection } from './SoundBoardSelection'
import { withStyles } from '@material-ui/core/styles'
import { WorkspaceSelection } from './WorkspaceSelection'
import { WorkspaceSaveButton } from './WorkspaceSaveButton'

const styles = theme => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    width: theme.spacing(24)
  },
  sticky: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'sticky',
    top: 0
  },
  overlay: {
    display: 'flex',
    background: '#f0f0f0',
    borderRight: '1px solid #eee',
    flexDirection: 'column',
    flexGrow: 1,
    marginBottom: theme.spacing(3)
  },
  buttons: {
    display: 'flex',
    marginTop: 'auto',
    paddingLeft: theme.spacing(1)
  },
  stretch: {
    width: '100%'
  }
})

function WorkspaceSidebarComponent ({ activeStory, classes, board, view }) {
  return (
    <div className={classes.sidebar}>
      <div className={classes.sticky}>
        <div className={classes.overlay}>
          <MainMenu />
          {activeStory && (
            <React.Fragment>
              <WorkspaceSelection className={classes.stretch} />
              <SoundBoardSelection />
              <div className={classes.buttons}>
                <WorkspaceSaveButton />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

WorkspaceSidebarComponent.propTypes = {
  classes: Classes.isRequired
}

const mapStateToProps = state => ({
  activeStory: getActiveStoryName(state)
})

export const WorkspaceSidebar = connect(
  mapStateToProps
)(withStyles(styles)(WorkspaceSidebarComponent))
