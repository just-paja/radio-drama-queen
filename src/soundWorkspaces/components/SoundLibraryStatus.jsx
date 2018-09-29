import AllInclusiveIcon  from '@material-ui/icons/AllInclusive';
import DashboardIcon  from '@material-ui/icons/Dashboard';
import ErrorIcon  from '@material-ui/icons/Error';
import MemoryIcon from '@material-ui/icons/Memory';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Classes } from '../../proptypes';

const styles = (theme) => {
  console.log(theme);
  return ({
    footer: {
      background: 'rgba(0,0,0,.8)',
      bottom: 0,
      color: 'white',
      fontSize: theme.typography.fontSize * 0.75,
      left: 0,
      paddingRight: theme.spacing.unit / 2,
      position: 'fixed',
      right: 0,
      justifyContent: 'flex-end',
      display: 'flex',
    },
    stat: {
      display: 'block',
      background: '#000',
      padding: theme.spacing.unit / 2,
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      marginLeft: theme.spacing.unit / 2
    },
    icon: {
      height: theme.typography.fontSize * 0.75,
      width: theme.typography.fontSize * 0.75,
      verticalAlign: 'middle',
    }
  });
};

const SoundLibraryStatus = ({
  boardSounds,
  classes,
  errorSounds,
  inMemorySounds,
  playingSounds,
  registeredSounds,
}) => (
  <footer className={classes.footer}>
    <span className={classes.stat}>
      <PlayArrowIcon className={classes.icon} />
      {' '}
      {playingSounds}
    </span>
    <span className={classes.stat}>
      <ErrorIcon className={classes.icon} />
      {' '}
      {errorSounds}
    </span>
    <span className={classes.stat}>
      <MemoryIcon className={classes.icon} />
      {' '}
      {inMemorySounds}
    </span>
    <span className={classes.stat}>
      <DashboardIcon className={classes.icon} />
      {' '}
      {boardSounds}
    </span>
    <span className={classes.stat}>
      <AllInclusiveIcon className={classes.icon} />
      {' '}
      {registeredSounds}
    </span>
  </footer>
);

SoundLibraryStatus.propTypes = {
  boardSounds: PropTypes.number.isRequired,
  classes: Classes.isRequired,
  errorSounds: PropTypes.number.isRequired,
  inMemorySounds: PropTypes.number.isRequired,
  playingSounds: PropTypes.number.isRequired,
  registeredSounds: PropTypes.number.isRequired,
};

export default withStyles(styles)(SoundLibraryStatus);
