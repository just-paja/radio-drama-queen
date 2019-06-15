import React from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { getActiveStoryName } from '../selectors'
import { MainMenu } from './MainMenu'
import { SoundBoardSelection } from './SoundBoardSelection'
import { withStyles } from '@material-ui/core/styles'
import { WorkspaceSelection } from './WorkspaceSelection'

const styles = theme => ({
  sidebar: {
    background: '#f0f0f0',
    borderRight: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    minWidth: theme.spacing(24)
  },
  sticky: {
    position: 'sticky',
    top: 0
  }
})

function WorkspaceSidebarComponent ({ activeStory, classes, board, view }) {
  return (
    <div className={classes.sidebar}>
      <div className={classes.sticky}>
        <MainMenu />
        {activeStory && <WorkspaceSelection />}
        <SoundBoardSelection />
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
