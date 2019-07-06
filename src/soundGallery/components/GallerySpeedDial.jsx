import DashboardIcon from '@material-ui/icons/Dashboard'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import PropTypes from 'prop-types'
import React from 'react'

import SceneSpeedDial from '../../components/SceneSpeedDial'

const GallerySpeedDialComponent = ({ onBoardCreate }) => (
  <SceneSpeedDial label='Sound Gallery Speed Dial'>
    <SpeedDialAction
      icon={<DashboardIcon />}
      onClick={onBoardCreate}
      tooltipTitle='Create board'
    />
  </SceneSpeedDial>
)

GallerySpeedDialComponent.propTypes = {
  onBoardCreate: PropTypes.func.isRequired
}

export const GallerySpeedDial = GallerySpeedDialComponent
