import PropTypes from 'prop-types'
import React from 'react'

import { BoardRenameDialog } from '../../soundBoards/components'
import { CategoryRenameDialog, SoundAddDialog } from '../../soundCategories/components'
import { connect } from 'react-redux'
import { getActiveBoardUuid, getFocusedCategory, getWorkspaceView } from '../selectors'
import { SoundBoardView } from './SoundBoardView'
import { SoundGalleryView } from './SoundGalleryView'
import { StoryView } from './StoryView'
import { VIEW_BOARD, VIEW_LIBRARY, VIEW_STORIES } from '../constants'
import { withStyles } from '@material-ui/core/styles'
import { workspaceRoutines } from '../actions'
import { WorkspaceShortcuts } from './WorkspaceShortcuts'
import { WorkspaceStatus } from './WorkspaceStatus'

const styles = theme => ({
  withHeader: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})
class WorkspaceViewComponent extends React.PureComponent {
  componentDidMount() {
    this.props.onLoad()
  }

  renderView () {
    const { board, view } = this.props
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

  render () {
    const { classes, board, focusedCategory, initialized } = this.props
    if (!initialized) {
      return null
    }
    return (
      <div className={classes.withHeader}>
        <WorkspaceStatus />
        {this.renderView()}
        <WorkspaceShortcuts />
        <BoardRenameDialog />
        <SoundAddDialog board={board} focusedCategory={focusedCategory} />
        <CategoryRenameDialog />
      </div>
    )
  }
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
  focusedCategory: getFocusedCategory(state),
  initialized: workspaceRoutines.load.isInitialized(state),
  view: getWorkspaceView(state)
})

const mapDispatchToProps = {
  onLoad: workspaceRoutines.load
}

export const WorkspaceView = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WorkspaceViewComponent))
