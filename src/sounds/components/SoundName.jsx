import PropTypes from 'prop-types'
import React from 'react'

const SoundName = ({ name, uuid }) => (
  <span>
    {name || uuid}
  </span>
)

SoundName.propTypes = {
  name: PropTypes.string,
  uuid: PropTypes.string.isRequired
}

SoundName.defaultProps = {
  name: '',
  highlight: ''
}

export default SoundName
