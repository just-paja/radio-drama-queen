import PropTypes from 'prop-types'
import React from 'react'
import Stop from '@material-ui/icons/Stop'

import SoundCategoryIconButton from './SoundCategoryIconButton'

const SoundCategoryStopButton = ({ onClick, playing }) => (
  <SoundCategoryIconButton
    disabled={!playing}
    color={playing ? 'primary' : 'default'}
    icon={Stop}
    onClick={onClick}
  />
)

SoundCategoryStopButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  playing: PropTypes.bool
}

SoundCategoryStopButton.defaultProps = {
  playing: false
}

export default SoundCategoryStopButton
