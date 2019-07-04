import React from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { getActiveStoryName } from '../selectors'
import { SoundBoardSelection } from './SoundBoardSelection'
import { withStyles } from '@material-ui/core/styles'
import { WorkspaceSaveButton } from '../../soundStories/components'

const styles = theme => ({
  sidebar: {
    background: '#f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    minWidth: theme.spacing(24)
  },
  sticky: {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0
  },
  overlay: {
    display: 'flex',
    borderRight: '1px solid #eee',
    flexDirection: 'column',
    flexGrow: 1,
    marginBottom: theme.spacing(2)
  },
  buttons: {
    bottom: theme.spacing(2),
    display: 'flex',
    left: theme.spacing(2),
    marginTop: 'auto',
    position: 'fixed'
  }
})

function WorkspaceSidebarComponent ({ activeStory, classes, board, view }) {
  return (
    <div className={classes.sidebar}>
      <div className={classes.sticky}>
        <div className={classes.overlay}>
          {activeStory && (
            <React.Fragment>
              <SoundBoardSelection />
            </React.Fragment>
          )}
        </div>
      </div>
      {activeStory && (
        <div className={classes.buttons}>
          <WorkspaceSaveButton />
        </div>
      )}
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
