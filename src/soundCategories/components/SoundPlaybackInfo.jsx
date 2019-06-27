import formatDuration from 'format-duration'
import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../../proptypes'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  duration: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  data: {
    flexShrink: 0
  },
  progress: {
    alignItems: 'center',
    display: 'flex',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    flexGrow: 1,
    flexShrink: 1
  },
  indicator: {
    background: 'rgba(0,0,0,.25)',
    height: 3,
    width: '100%'
  }
})

function SoundPlaybackInfoComponent ({ classes, duration }) {
  return !duration ? null : (
    <span className={classes.duration}>
      <span className={classes.data}>
        00:00
      </span>
      <span className={classes.progress}>
        <span className={classes.indicator} />
      </span>
      <span className={classes.data}>
        {formatDuration(duration * 1000)}
      </span>
    </span>
  )
}

SoundPlaybackInfoComponent.displayName = 'SoundPlaybackInfo'
SoundPlaybackInfoComponent.propTypes = {
  classes: Classes.isRequired,
  duration: PropTypes.number
}

SoundPlaybackInfoComponent.defaultProps = {
  duration: null
}

export const SoundPlaybackInfo = withStyles(styles)(SoundPlaybackInfoComponent)
