import PropTypes from 'prop-types'

export const SoundLibrary = PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  directory: PropTypes.string
})
