import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { SoundBoard } from '../proptypes';

class SoundBoardSelection extends Component {
  constructor() {
    super();
    this.handleBoardChange = this.handleBoardChange.bind(this);
  }

  handleBoardChange(event, value) {
    const { onBoardSelect } = this.props;
    onBoardSelect(value);
  }

  render() {
    const { activeBoard, boards } = this.props;
    return (
      <ToggleButtonGroup
        exclusive
        onChange={this.handleBoardChange}
        value={activeBoard}
      >
        {boards.map(board => (
          <ToggleButton key={board.uuid} value={board.uuid}>
            {board.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  }
}

SoundBoardSelection.propTypes = {
  activeBoard: PropTypes.string,
  boards: PropTypes.arrayOf(SoundBoard).isRequired,
  onBoardSelect: PropTypes.func.isRequired,
};

SoundBoardSelection.defaultProps = {
  activeBoard: null,
};

export default SoundBoardSelection;
