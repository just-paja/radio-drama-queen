import PropTypes from 'prop-types'

export const Sound = PropTypes.shape({
  uuid: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  name: PropTypes.string,
  playing: PropTypes.bool,
  valid: PropTypes.bool
})

export default { Sound }
