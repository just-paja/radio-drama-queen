import AllInclusiveIcon from '@material-ui/icons/AllInclusive'
import DashboardIcon from '@material-ui/icons/Dashboard'
import LabelIcon from '@material-ui/icons/Label'
import MemoryIcon from '@material-ui/icons/Memory'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PropTypes from 'prop-types'
import React from 'react'
import SoundStopAllButton from '../../sounds/containers/SoundStopAllButton'
import WarningIcon from '@material-ui/icons/Warning'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { getGallerySize } from '../../soundGallery/selectors'
import { withStyles } from '@material-ui/core/styles'
import {
  countBoardSounds,
  countErrorSounds,
  countMemorySounds,
  countPlayingSounds,
  countTags
} from '../selectors'

const mapStateToProps = state => ({
  boardSounds: countBoardSounds(state),
  errorSounds: countErrorSounds(state),
  inMemorySounds: countMemorySounds(state),
  playingSounds: countPlayingSounds(state),
  registeredSounds: getGallerySize(state),
  tags: countTags(state)
})

const styles = theme => ({
  footer: {
    background: 'rgba(0,0,0,.33)',
    bottom: 0,
    color: 'white',
    cursor: 'default',
    display: 'flex',
    fontSize: theme.typography.fontSize,
    justifyContent: 'flex-end',
    left: 0,
    paddingLeft: theme.spacing(24),
    paddingRight: theme.spacing(1 / 2),
    position: 'fixed',
    right: 0,
    userSelect: 'none',
    zIndex: 1200
  },
  stat: {
    display: 'block',
    background: 'rgba(0,0,0,.66)',
    padding: theme.spacing(1 / 2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginLeft: theme.spacing(1 / 2)
  },
  stopAllButton: {
    marginRight: 'auto',
    marginLeft: theme.spacing(1)
  },
  icon: {
    height: theme.typography.fontSize * 0.75,
    width: theme.typography.fontSize * 0.75,
    verticalAlign: 'middle'
  }
})

const renderNumberWithIcon = (classes, number, IconComponent, title) => (
  <span className={classes.stat} title={title}>
    <IconComponent className={classes.icon} />
    {' '}
    {number}
  </span>
)

const SoundLibraryStatusComponent = ({
  boardSounds,
  classes,
  errorSounds,
  inMemorySounds,
  playingSounds,
  registeredSounds,
  tags
}) => (
  <footer className={classes.footer}>
    <SoundStopAllButton className={classes.stopAllButton} />
    {renderNumberWithIcon(classes, playingSounds, PlayArrowIcon, 'Playing')}
    {renderNumberWithIcon(classes, tags, LabelIcon, 'Tags')}
    {renderNumberWithIcon(classes, errorSounds, WarningIcon, 'Sound errors')}
    {renderNumberWithIcon(classes, inMemorySounds, MemoryIcon, 'Sounds ready to play')}
    {renderNumberWithIcon(classes, boardSounds, DashboardIcon, 'Sounds on board')}
    {renderNumberWithIcon(classes, registeredSounds, AllInclusiveIcon, 'Registered sounds')}
  </footer>
)

SoundLibraryStatusComponent.displayName = 'SoundLibraryStatus'

SoundLibraryStatusComponent.propTypes = {
  boardSounds: PropTypes.number.isRequired,
  classes: Classes.isRequired,
  errorSounds: PropTypes.number.isRequired,
  inMemorySounds: PropTypes.number.isRequired,
  playingSounds: PropTypes.number.isRequired,
  registeredSounds: PropTypes.number.isRequired,
  tags: PropTypes.number.isRequired
}

export const SoundLibraryStatus = connect(mapStateToProps)(
  withStyles(styles)(SoundLibraryStatusComponent)
)
