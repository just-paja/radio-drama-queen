import PropTypes from 'prop-types'

export const SoundTag = PropTypes.shape({
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  language: PropTypes.string
})

export default { SoundTag }
