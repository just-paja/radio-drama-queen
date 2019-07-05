import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'

function CategoryNameComponent ({ name, uuid }) {
  return (
    <Typography variant='h5'>
      {name || 'Unnamed'}
    </Typography>
  )
}

CategoryNameComponent.displayName = 'CategoryName'
CategoryNameComponent.propTypes = {
  name: PropTypes.string,
  uuid: PropTypes.string.isRequired
}

CategoryNameComponent.defaultProps = {
  name: null
}

export const CategoryName = CategoryNameComponent
