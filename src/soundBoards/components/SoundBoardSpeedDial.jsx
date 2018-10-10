import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/List';
import PropTypes from 'prop-types';
import React from 'react';
import MusicNote from '@material-ui/icons/MusicNote';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import SceneSpeedDial from '../../components/SceneSpeedDial';

const SoundBoardSpeedDial = ({
  classes,
  onBoardCreate,
  onCategoryCreate,
  onSoundAdd,
}) => (
  <SceneSpeedDial label="Sound Grid Speed Dial">
    <SpeedDialAction
      icon={<MusicNote />}
      onClick={onSoundAdd}
      tooltipTitle="Add Sound"
    />
    <SpeedDialAction
      icon={<ListIcon />}
      onClick={onCategoryCreate}
      tooltipTitle="Create Category"
    />
    <SpeedDialAction
      icon={<DashboardIcon />}
      onClick={onBoardCreate}
      tooltipTitle="Create Board"
    />
  </SceneSpeedDial>
);

SoundBoardSpeedDial.propTypes = {
  onBoardCreate: PropTypes.func.isRequired,
  onCategoryCreate: PropTypes.func.isRequired,
};

export default SoundBoardSpeedDial;
