import formatDuration from 'format-duration'
import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../../proptypes'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  duration: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%'
  },
  data: {
    flexShrink: 0
  },
  progress: {
    background: theme.palette.listSeparator,
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    height: 3,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  indicator: {
    background: theme.palette.interactionOverlay,
    transformOrigin: 'center left',
    width: '100%'
  }
})

class SoundPlaybackInfoComponent extends React.Component {
  render () {
    const { classes, duration, position } = this.props
    return !duration ? null : (
      <span className={classes.duration}>
        <span className={classes.data}>
          {formatDuration(position * 1000)}
        </span>
        <span className={classes.progress}>
          <span
            className={classes.indicator}
            style={{
              transform: `scaleX(${position / duration})`
            }}
          />
        </span>
        <span className={classes.data}>
          {formatDuration(duration * 1000)}
        </span>
      </span>
    )
  }
}

SoundPlaybackInfoComponent.displayName = 'SoundPlaybackInfo'
SoundPlaybackInfoComponent.propTypes = {
  classes: Classes.isRequired,
  duration: PropTypes.number,
  position: PropTypes.number,
  playing: PropTypes.bool,
  cachePath: PropTypes.string.isRequired
}

SoundPlaybackInfoComponent.defaultProps = {
  duration: null,
  playing: false
}

export const SoundPlaybackInfo = withStyles(styles)(SoundPlaybackInfoComponent)
