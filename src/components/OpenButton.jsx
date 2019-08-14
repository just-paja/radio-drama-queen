import PropTypes from 'prop-types'
import React from 'react'
import FolderOpen from '@material-ui/icons/FolderOpen'

import { LabelButton } from './LabelButton'

const OpenButton = ({ children, ...props }) => (
  <LabelButton icon={FolderOpen} {...props}>
    {children}
  </LabelButton>
)

OpenButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

OpenButton.defaultProps = {
  children: null
}

export default OpenButton
