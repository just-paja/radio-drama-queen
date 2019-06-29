import { connect } from 'react-redux'
import { isAnySoundPlaying } from '../selectors'
import { soundRoutines } from '../actions'

import SoundStopButton from './SoundStopButton'

const mapStateToProps = state => ({
  playing: isAnySoundPlaying(state)
})

const mapDispatchToProps = {
  onClick: soundRoutines.stopAll
}

export const StopAllButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundStopButton)
