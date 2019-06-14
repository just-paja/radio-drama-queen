import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { getActiveBoardUuid, getWorkspaceView } from '../selectors'
import { SoundBoardView } from './SoundBoardView'
import { SoundGalleryView } from './SoundGalleryView'
import { VIEW_BOARD, VIEW_LIBRARY } from '../constants'
import { withStyles } from '@material-ui/core/styles'
import { WorkspaceSidebar } from './WorkspaceSidebar'

const styles = theme => ({
  sidebar: {
    minWidth: theme.spacing(24)
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1
  }
})

function renderContent (board, view) {
  if (view === VIEW_LIBRARY) {
    return <SoundGalleryView />
  }
  if (view === VIEW_BOARD && board) {
    return <SoundBoardView board={board} />
  }
  return null
}

function WorkspaceViewComponent ({ classes, board, view }) {
  return (
    <div className={classes.view}>
      <WorkspaceSidebar />
      {renderContent(board, view)}
    </div>
  )
}

WorkspaceViewComponent.displayName = 'WorkspaceView'

WorkspaceViewComponent.propTypes = {
  board: PropTypes.string,
  view: PropTypes.string
}

WorkspaceViewComponent.defaultProps = {
  board: null,
  view: null
}

const mapStateToProps = state => ({
  board: getActiveBoardUuid(state),
  view: getWorkspaceView(state)
})

export const WorkspaceView = connect(
  mapStateToProps
)(withStyles(styles)(WorkspaceViewComponent))
