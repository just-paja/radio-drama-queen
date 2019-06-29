import PropTypes from 'prop-types'
import React from 'react'

import { ClassName } from '../../proptypes'

const SoundName = ({ className, name, uuid }) => (
  <span className={className}>
    {name || uuid}
  </span>
)

SoundName.propTypes = {
  className: ClassName,
  name: PropTypes.string,
  uuid: PropTypes.string.isRequired
}

SoundName.defaultProps = {
  className: null,
  name: '',
  highlight: ''
}

export default SoundName
