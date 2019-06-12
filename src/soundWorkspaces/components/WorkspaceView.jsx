import PropTypes from 'prop-types'
import React from 'react'
import SoundGalleryView from '../containers/SoundGalleryView'

import { connect } from 'react-redux'
import { getActiveBoardUuid, getWorkspaceView } from '../selectors'
import { SoundBoardView } from './SoundBoardView'
import { VIEW_BOARD, VIEW_LIBRARY } from '../constants'

function WorkspaceViewComponent ({ board, view }) {
  if (view === VIEW_LIBRARY) {
    return <SoundGalleryView />
  }
  if (view === VIEW_BOARD && board) {
    return <SoundBoardView board={board} />
  }
  return null
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

export const WorkspaceView = connect(mapStateToProps)(WorkspaceViewComponent)
