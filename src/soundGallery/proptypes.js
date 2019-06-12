import PropTypes from 'prop-types'

export const GallerySound = PropTypes.shape({
  name: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  uuid: PropTypes.string.isRequired
})

export const GalleryTarget = PropTypes.shape({
  board: PropTypes.string,
  category: PropTypes.string
})
