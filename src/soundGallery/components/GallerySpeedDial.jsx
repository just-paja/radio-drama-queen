import DashboardIcon from '@material-ui/icons/Dashboard'
import LibraryMusic from '@material-ui/icons/LibraryMusic'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import PropTypes from 'prop-types'
import React from 'react'

import SceneSpeedDial from '../../components/SceneSpeedDial'

import { OpenLibraryDialog } from '../../soundLibraries/components'
import { connect } from 'react-redux'

const GallerySpeedDialComponent = ({ onBoardCreate, onLibraryOpen }) => (
  <SceneSpeedDial label='Sound Gallery Speed Dial'>
    <SpeedDialAction
      icon={<LibraryMusic />}
      onClick={onLibraryOpen}
      tooltipTitle='Add library'
    />
    <SpeedDialAction
      icon={<DashboardIcon />}
      onClick={onBoardCreate}
      tooltipTitle='Create board'
    />
  </SceneSpeedDial>
)

GallerySpeedDialComponent.propTypes = {
  onBoardCreate: PropTypes.func.isRequired,
  onLibraryOpen: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  onLibraryOpen: OpenLibraryDialog.open
}

export const GallerySpeedDial = connect(
  undefined,
  mapDispatchToProps
)(GallerySpeedDialComponent)
