import PropTypes from 'prop-types'
import React from 'react'

import { ClassName } from '../../proptypes'

const SoundName = ({ className, name, cachePath }) => (
  <span className={className}>
    {name || cachePath}
  </span>
)

SoundName.propTypes = {
  className: ClassName,
  name: PropTypes.string,
  cachePath: PropTypes.string.isRequired
}

SoundName.defaultProps = {
  className: null,
  name: '',
  highlight: ''
}

export default SoundName
