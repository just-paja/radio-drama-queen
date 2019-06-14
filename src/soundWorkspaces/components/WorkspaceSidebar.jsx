import React from 'react'

import { Classes } from '../../proptypes'
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
  workspaceSelection: {
    marginTop: 'auto',
    marginBottom: theme.spacing(3)
  }
})

function WorkspaceSidebarComponent ({ classes, board, view }) {
  return (
    <div className={classes.sidebar}>
      <SoundBoardSelection />
      <WorkspaceSelection className={classes.workspaceSelection} />
    </div>
  )
}

WorkspaceSidebarComponent.propTypes = {
  classes: Classes.isRequired
}

export const WorkspaceSidebar = withStyles(styles)(WorkspaceSidebarComponent)
