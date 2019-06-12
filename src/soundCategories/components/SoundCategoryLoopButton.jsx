import PropTypes from 'prop-types'
import React from 'react'
import Repeat from '@material-ui/icons/Repeat'

import SoundCategoryIconButton from './SoundCategoryIconButton'

const SoundCategoryLoopButton = ({ onClick, loop }) => (
  <SoundCategoryIconButton
    color={loop ? 'primary' : 'default'}
    icon={Repeat}
    onClick={onClick}
  />
)

SoundCategoryLoopButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  loop: PropTypes.bool
}

SoundCategoryLoopButton.defaultProps = {
  loop: false
}

export default SoundCategoryLoopButton
