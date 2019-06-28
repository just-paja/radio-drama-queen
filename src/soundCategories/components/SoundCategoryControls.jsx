import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SoundCategoryExclusiveButton from './SoundCategoryExclusiveButton'
import SoundCategoryLoopButton from './SoundCategoryLoopButton'
import SoundCategoryStopButton from './SoundCategoryStopButton'
import VolumeControl from './VolumeControl'
import VolumeToggleButton from './VolumeToggleButton'

import { Classes } from '../../proptypes'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  buttons: {
    marginLeft: theme.spacing(-3 / 2),
    marginRight: theme.spacing(-3 / 2),
    width: '100%'
  }
})

class SoundCategoryControls extends Component {
  constructor () {
    super()
    this.handleExclusiveToggle = this.handleExclusiveToggle.bind(this)
    this.handleLoopToggle = this.handleLoopToggle.bind(this)
    this.handleMuteToggle = this.handleMuteToggle.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleVolumeChange = this.handleVolumeChange.bind(this)
  }

  handleLoopToggle () {
    this.props.onLoopToggle(this.props.uuid)
  }

  handleStop () {
    this.props.onStop(this.props.uuid)
  }

  handleVolumeChange (value) {
    this.props.onVolumeChange(this.props.uuid, value)
  }

  handleMuteToggle () {
    this.props.onMuteToggle(this.props.uuid)
  }

  handleExclusiveToggle () {
    this.props.onExclusiveToggle(this.props.uuid)
  }

  render () {
    const { classes, exclusive, loop, muted, playing, volume } = this.props
    return (
      <React.Fragment>
        <VolumeControl
          muted={muted}
          onChange={this.handleVolumeChange}
          onMuteToggle={this.handleMuteToggle}
          volume={volume}
        />
        <div className={classes.buttons}>
          <SoundCategoryStopButton playing={playing} onClick={this.handleStop} />
          <SoundCategoryLoopButton loop={loop} onClick={this.handleLoopToggle} />
          <SoundCategoryExclusiveButton
            exclusive={exclusive}
            onClick={this.handleExclusiveToggle}
          />
          <VolumeToggleButton onClick={this.handleMuteToggle} muted={muted} />
        </div>
      </React.Fragment>
    )
  }
}

SoundCategoryControls.propTypes = {
  classes: Classes.isRequired,
  exclusive: PropTypes.bool,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  onExclusiveToggle: PropTypes.func.isRequired,
  onLoopToggle: PropTypes.func.isRequired,
  onMuteToggle: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  playing: PropTypes.bool,
  uuid: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired
}

SoundCategoryControls.defaultProps = {
  exclusive: false,
  loop: false,
  muted: false,
  playing: false
}

export default withStyles(styles)(SoundCategoryControls)
