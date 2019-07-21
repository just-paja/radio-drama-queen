import PropTypes from 'prop-types'
import React from 'react'

import { InputFileSystem } from './InputFileSystem'

const mode = ['openFile']

export function InputFile ({ multi, ...props }) {
  return (
    <InputFileSystem
      {...props}
      mode={mode}
      multi={multi}
    />
  )
}

export const Filter = PropTypes.shape({
  extensions: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired
})

InputFile.displayName = 'InputFile'
InputFile.propTypes = {
  filters: PropTypes.arrayOf(Filter).isRequired,
  multi: PropTypes.bool
}

InputFile.defaultProps = {
  multi: false
}
