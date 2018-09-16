import CategoryIcon from '@material-ui/icons/Category';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Classes } from '../proptypes';

const styles = theme => ({
  speedDial: {
    bottom: theme.spacing.unit * 2,
    position: 'absolute',
    right: theme.spacing.unit * 2,
  },
});

class SoundCategoryGridSpeedDial extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.state = {
      open: false,
    };
  }

  handleClick() {
    this.setState(state => ({ open: !state.open }));
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { classes, onCategoryCreate } = this.props;
    const { open } = this.state;
    const isTouch = typeof document !== 'undefined' && 'ontouchstart' in document.documentElement;
    return (
      <SpeedDial
        ariaLabel="Sound Grid Speed Dial"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onBlur={this.handleClose}
        onClick={this.handleClick}
        onClose={this.handleClose}
        onFocus={isTouch ? undefined : this.handleOpen}
        onMouseEnter={isTouch ? undefined : this.handleOpen}
        onMouseLeave={this.handleClose}
        open={open}
      >
        <SpeedDialAction
          icon={<CategoryIcon />}
          onClick={onCategoryCreate}
          tooltipTitle="Create category"
        />
      </SpeedDial>
    );
  }
}

SoundCategoryGridSpeedDial.propTypes = {
  classes: Classes.isRequired,
  onCategoryCreate: PropTypes.func.isRequired,
};

export default withStyles(styles)(SoundCategoryGridSpeedDial);
