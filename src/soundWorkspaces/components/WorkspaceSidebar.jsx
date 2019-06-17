import React from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { getActiveStoryName } from '../selectors'
import { SoundBoardSelection } from './SoundBoardSelection'
import { withStyles } from '@material-ui/core/styles'
import { WorkspaceSaveButton } from '../../soundStories/components'
import { WorkspaceSelection } from './WorkspaceSelection'

const styles = theme => ({
  sidebar: {
    background: '#f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    width: theme.spacing(24)
  },
  sticky: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    position: 'sticky',
    top: 0
  },
  overlay: {
    display: 'flex',
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

WorkspaceSidebarComponent.displayName = 'WorkspaceSidebar'
WorkspaceSidebarComponent.propTypes = {
  classes: Classes.isRequired
}

const mapStateToProps = state => ({
  activeStory: getActiveStoryName(state)
})

export const WorkspaceSidebar = connect(
  mapStateToProps
)(withStyles(styles)(WorkspaceSidebarComponent))
