import PropTypes from 'prop-types'

export const Classes = PropTypes.objectOf(PropTypes.string)

export const Children = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.arrayOf(PropTypes.node)
])

export const ClassName = PropTypes.oneOfType([
  Classes,
  PropTypes.arrayOf(Classes),
  PropTypes.arrayOf(PropTypes.string),
  PropTypes.string
])

export const Sound = PropTypes.shape({
  uuid: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  name: PropTypes.string,
  playing: PropTypes.bool,
  valid: PropTypes.bool
})

export const Option = PropTypes.shape({
  label: PropTypes.node,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
})

export const Options = PropTypes.arrayOf(Option)
