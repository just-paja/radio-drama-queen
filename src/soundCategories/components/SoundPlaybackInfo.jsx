import formatDuration from 'format-duration'
import PropTypes from 'prop-types'
import React from 'react'
import AudioManager from '../../sounds/AudioManager'

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
    transformOrigin: 'center left',
    width: '100%'
  }
})

class SoundPlaybackInfoComponent extends React.Component {
  animationFrameId = null
  audio = null
  state = { position: 0 }

  constructor(props) {
    super(props)
    this.pipePosition = this.pipePosition.bind(this)
    this.reset = this.reset.bind(this)
    this.updatePosition = this.updatePosition.bind(this)
  }

  componentDidMount () {
    this.readAudio(this.props.uuiid)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.uuid !== this.props.uuid || !this.audio) {
      this.readAudio()
    }
    if (!prevProps.playing && this.props.playing) {
      this.queueFrame(this.pipePosition)
    }
    if (prevProps.playing && !this.props.playing) {
      global.cancelAnimationFrame(this.animationFrameId)
      this.queueFrame(this.reset)
    }
  }

  queueFrame (lambda) {
    this.animationFrameId = global.requestAnimationFrame(lambda)
  }

  readAudio () {
    this.audio = AudioManager.findByUuid(this.props.uuid)
  }

  pipePosition () {
    if (this.audio) {
      this.updatePosition()
      if (this.props.playing) {
        this.queueFrame(this.pipePosition)
      }
    }
  }

  reset () {
    this.setState({ position: 0 })
  }

  updatePosition () {
    this.setState({
      position: this.audio ? this.audio.sound.seek() : 0
    })
  }

  render () {
    const { classes, duration, playing } = this.props
    return !duration ? null : (
      <span className={classes.duration}>
        <span className={classes.data}>
          {formatDuration(this.state.position * 1000)}
        </span>
        <span className={classes.progress}>
          <span
            className={classes.indicator}
            style={{
              transform: `scaleX(${this.state.position / this.props.duration})`
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
  playing: PropTypes.bool,
  uuid: PropTypes.string.isRequired
}

SoundPlaybackInfoComponent.defaultProps = {
  duration: null,
  playing: false,
}

export const SoundPlaybackInfo = withStyles(styles)(SoundPlaybackInfoComponent)
