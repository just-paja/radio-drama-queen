import PropTypes from 'prop-types'
import React from 'react'

import { BoardRenameDialog } from '../../soundBoards/components'
import { CategoryRenameDialog } from '../../soundCategories/components'
import { connect } from 'react-redux'
import { getActiveBoardUuid, getWorkspaceView } from '../selectors'
import { isGalleryEmpty } from '../../soundGallery/selectors'
import { SoundBoardView } from './SoundBoardView'
import { SoundGalleryView } from './SoundGalleryView'
import { StoryView } from './StoryView'
import { VIEW_BOARD, VIEW_LIBRARY, VIEW_STORIES } from '../constants'
import { withStyles } from '@material-ui/core/styles'
import { WorkspaceSidebar } from './WorkspaceSidebar'
import { WorkspaceStatus } from './WorkspaceStatus'

const styles = theme => ({
  sidebar: {
    minWidth: theme.spacing(24)
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1
  },
  withHeader: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

function renderContent (empty, board, view) {
  if (view === VIEW_LIBRARY) {
    return <SoundGalleryView />
  }
  if (view === VIEW_BOARD) {
    return <SoundBoardView board={board} />
  }
  if (view === VIEW_STORIES) {
    return <StoryView />
  }
  return null
}

function WorkspaceViewComponent ({ classes, board, empty, view }) {
  return (
    <div className={classes.withHeader}>
      <WorkspaceStatus />
      <div className={classes.view}>
        <WorkspaceSidebar />
        {renderContent(empty, board, view)}
      </div>
      <BoardRenameDialog />
      <CategoryRenameDialog />
    </div>
  )
}

WorkspaceViewComponent.displayName = 'WorkspaceView'

WorkspaceViewComponent.propTypes = {
  board: PropTypes.string,
  empty: PropTypes.bool,
  view: PropTypes.string
}

WorkspaceViewComponent.defaultProps = {
  board: null,
  empty: false,
  view: null
}

const mapStateToProps = state => ({
  board: getActiveBoardUuid(state),
  empty: isGalleryEmpty(state),
  view: getWorkspaceView(state)
})

export const WorkspaceView = connect(
  mapStateToProps
)(withStyles(styles)(WorkspaceViewComponent))
