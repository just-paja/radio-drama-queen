import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';

import { withStyles } from '@material-ui/core/styles';

import { Classes } from '../proptypes';

const styles = theme => ({
  speedDial: {
    bottom: theme.spacing(5),
    position: 'fixed',
    right: theme.spacing(2),
  },
});

class SceneSpeedDial extends Component {
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
    const { children, classes, label } = this.props;
    const { open } = this.state;
    const isTouch = typeof document !== 'undefined' && 'ontouchstart' in document.documentElement;
    return (
      <SpeedDial
        ariaLabel={label}
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
        {children}
      </SpeedDial>
    );
  }
}

SceneSpeedDial.propTypes = {
  classes: Classes.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  label: PropTypes.string.isRequired,
};

const comp = withStyles(styles)(SceneSpeedDial);

comp.displayName = 'SceneSpeedDial';

export default comp;
