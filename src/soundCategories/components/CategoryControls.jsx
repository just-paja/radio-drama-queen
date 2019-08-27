import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SoundCategoryExclusiveButton from './SoundCategoryExclusiveButton'
import SoundCategoryLoopButton from './SoundCategoryLoopButton'
import SoundCategoryStopButton from './SoundCategoryStopButton'
import VolumeControl from './VolumeControl'
import VolumeToggleButton from './VolumeToggleButton'

import { categoryRoutines } from '../actions'
import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
  getCategoryExclusiveStatus,
  getCategoryLoopStatus,
  getCategoryMutedStatus,
  getCategoryPlayingStatus,
  getCategoryVolume
} from '../selectors'

const styles = theme => ({
  buttons: {
    marginLeft: theme.spacing(-3 / 2),
    marginRight: theme.spacing(-3 / 2),
    width: '100%'
  }
})

class CategoryControlsComponent extends Component {
  constructor () {
    super()
    this.handleExclusiveToggle = this.handleExclusiveToggle.bind(this)
    this.handleLoopToggle = this.handleLoopToggle.bind(this)
    this.handleMuteToggle = this.handleMuteToggle.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleVolumeChange = this.handleVolumeChange.bind(this)
  }

  handleStop () {
    this.props.onStop(this.props.uuid)
  }

  handleVolumeChange (value) {
    this.props.onVolumeChange({
      uuid: this.props.uuid,
      volume: value
    })
  }

  toggle (prop, onOn, onOff) {
    return this.props[prop]
      ? this.props[onOff](this.props.uuid)
      : this.props[onOn](this.props.uuid)
  }

  handleLoopToggle () {
    this.toggle('loop', 'onLoopOn', 'onLoopOff')
  }

  handleMuteToggle () {
    this.toggle('muted', 'onMute', 'onUnmute')
  }

  handleExclusiveToggle () {
    this.toggle('exclusive', 'onExclusiveOn', 'onExclusiveOff')
  }

  render () {
    const { classes, exclusive, loop, muted, playing, volume } = this.props
    return (
      <>
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
      </>
    )
  }
}

CategoryControlsComponent.displayName = 'CategoryControls'
CategoryControlsComponent.propTypes = {
  classes: Classes.isRequired,
  exclusive: PropTypes.bool,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  onExclusiveOff: PropTypes.func.isRequired,
  onExclusiveOn: PropTypes.func.isRequired,
  onLoopOff: PropTypes.func.isRequired,
  onLoopOn: PropTypes.func.isRequired,
  onMute: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onUnmute: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  playing: PropTypes.bool,
  uuid: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired
}

CategoryControlsComponent.defaultProps = {
  exclusive: false,
  loop: false,
  muted: false,
  playing: false
}

const mapStateToProps = (state, { uuid }) => ({
  exclusive: getCategoryExclusiveStatus(state, uuid),
  loop: getCategoryLoopStatus(state, uuid),
  muted: getCategoryMutedStatus(state, uuid),
  playing: getCategoryPlayingStatus(state, uuid),
  volume: getCategoryVolume(state, uuid)
})

const mapDispatchToProps = {
  onExclusiveOff: categoryRoutines.exclusiveOff,
  onExclusiveOn: categoryRoutines.exclusiveOn,
  onLoopOff: categoryRoutines.loopOff,
  onLoopOn: categoryRoutines.loopOn,
  onMute: categoryRoutines.mute,
  onStop: categoryRoutines.stop,
  onUnmute: categoryRoutines.unmute,
  onVolumeChange: categoryRoutines.setVolume
}

export const CategoryControls = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(CategoryControlsComponent)
)
