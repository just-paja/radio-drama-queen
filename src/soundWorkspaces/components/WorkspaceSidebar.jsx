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
  sticky: {
    position: 'sticky',
    top: 0
  }
})

function WorkspaceSidebarComponent ({ classes, board, view }) {
  return (
    <div className={classes.sidebar}>
      <div className={classes.sticky}>
        <p style={{ textAlign: 'center' }}>Drama Queen</p>
        <WorkspaceSelection />
        <SoundBoardSelection />
      </div>
    </div>
  )
}

WorkspaceSidebarComponent.propTypes = {
  classes: Classes.isRequired
}

export const WorkspaceSidebar = withStyles(styles)(WorkspaceSidebarComponent)
