import PropTypes from 'prop-types'

export const SoundModule = PropTypes.shape({
  name: PropTypes.string.isRequired,
  library: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
})
