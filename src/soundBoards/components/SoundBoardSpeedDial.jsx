import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/List';
import MusicNote from '@material-ui/icons/MusicNote';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import TextFields from '@material-ui/icons/TextFields';

import SceneSpeedDial from '../../components/SceneSpeedDial';

class SoundBoardSpeedDial extends Component {
  constructor() {
    super();
    this.handleBoardRename = this.handleBoardRename.bind(this);
  }

  handleBoardRename() {
    const { boardUuid, onBoardRename } = this.props;
    onBoardRename(boardUuid);
  }

  render() {
    const {
      onBoardCreate,
      onCategoryCreate,
      onSoundAdd,
    } = this.props;
    return (
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
        <SpeedDialAction
          icon={<TextFields />}
          onClick={this.handleBoardRename}
          tooltipTitle="Change Board Name"
        />
      </SceneSpeedDial>
    );
  }
}

SoundBoardSpeedDial.propTypes = {
  boardUuid: PropTypes.string.isRequired,
  onBoardCreate: PropTypes.func.isRequired,
  onBoardRename: PropTypes.func.isRequired,
  onCategoryCreate: PropTypes.func.isRequired,
};

export default SoundBoardSpeedDial;
