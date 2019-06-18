import PropTypes from 'prop-types'

export const Sound = PropTypes.shape({
  duration: PropTypes.number,
  loading: PropTypes.bool,
  name: PropTypes.string,
  playing: PropTypes.bool,
  uuid: PropTypes.string.isRequired,
  valid: PropTypes.bool
})

export default { Sound }
