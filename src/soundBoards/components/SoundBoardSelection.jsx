import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { withStyles } from '@material-ui/core/styles';

import { Classes } from '../../proptypes';
import { SoundBoard } from '../proptypes';

const styles = {
  viewSwitcher: {
    background: 'none',
    boxShadow: 'none',
    display: 'flex',
    flexGrow: 1,
  },
};

class SoundBoardSelection extends Component {
  constructor() {
    super();
    this.handleBoardChange = this.handleBoardChange.bind(this);
  }

  handleBoardChange(event, value) {
    const { activeBoard, onBoardSelect } = this.props;
    onBoardSelect(value || activeBoard);
  }

  render() {
    const { activeBoard, classes, boards } = this.props;
    return (
      <ToggleButtonGroup
        className={classes.viewSwitcher}
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
  classes: Classes.isRequired,
  boards: PropTypes.arrayOf(SoundBoard).isRequired,
  onBoardSelect: PropTypes.func.isRequired,
};

SoundBoardSelection.defaultProps = {
  activeBoard: null,
};

export default withStyles(styles)(SoundBoardSelection);
