import PropTypes from 'prop-types'
import React from 'react'

import { InputFileSystem } from './InputFileSystem'

const mode = ['openDirectory']

export function InputDirectory ({ multi, ...props }) {
  return (
    <InputFileSystem
      {...props}
      mode={mode}
      multi={multi}
    />
  )
}

InputDirectory.displayName = 'InputDirectory'
InputDirectory.propTypes = {
  multi: PropTypes.bool
}

InputDirectory.defaultProps = {
  multi: false
}
