import PropTypes from 'prop-types'

export const Story = PropTypes.shape({
  name: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired
})
