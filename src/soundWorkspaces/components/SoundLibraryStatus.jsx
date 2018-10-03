import AllInclusiveIcon  from '@material-ui/icons/AllInclusive';
import DashboardIcon  from '@material-ui/icons/Dashboard';
import LabelIcon  from '@material-ui/icons/Label';
import MemoryIcon from '@material-ui/icons/Memory';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PropTypes from 'prop-types';
import React from 'react';
import WarningIcon  from '@material-ui/icons/Warning';

import { withStyles } from '@material-ui/core/styles';

import { Classes } from '../../proptypes';

const styles = theme => ({
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

const renderNumberWithIcon = (classes, number, IconComponent) => (
  <span className={classes.stat}>
    <IconComponent className={classes.icon} />
    {' '}
    {number}
  </span>
);

const SoundLibraryStatus = ({
  boardSounds,
  classes,
  errorSounds,
  inMemorySounds,
  playingSounds,
  registeredSounds,
  tags,
}) => (
  <footer className={classes.footer}>
    {renderNumberWithIcon(classes, playingSounds, PlayArrowIcon)}
    {renderNumberWithIcon(classes, tags, LabelIcon)}
    {renderNumberWithIcon(classes, errorSounds, WarningIcon)}
    {renderNumberWithIcon(classes, inMemorySounds, MemoryIcon)}
    {renderNumberWithIcon(classes, boardSounds, DashboardIcon)}
    {renderNumberWithIcon(classes, registeredSounds, AllInclusiveIcon)}
  </footer>
);

SoundLibraryStatus.propTypes = {
  boardSounds: PropTypes.number.isRequired,
  classes: Classes.isRequired,
  errorSounds: PropTypes.number.isRequired,
  inMemorySounds: PropTypes.number.isRequired,
  playingSounds: PropTypes.number.isRequired,
  registeredSounds: PropTypes.number.isRequired,
  tags: PropTypes.number.isRequired,
};

export default withStyles(styles)(SoundLibraryStatus);
