import Menu from '@material-ui/core/Menu'
import PropTypes from 'prop-types'
import React from 'react'

import { Children, Classes } from '../proptypes'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  menu: {
    paddingBottom: 0,
    paddingTop: 0
  }
}

const ContextMenuComponent = ({ anchorEl, children, classes, onClose }) => (
  <Menu
    anchorEl={anchorEl}
    classes={{ list: classes.menu }}
    onClose={onClose}
    open={Boolean(anchorEl)}
  >
    {React.Children.map(children, child => React.cloneElement(child, { onClose }))}
  </Menu>
)

ContextMenuComponent.displaName = 'ContextMenu'
ContextMenuComponent.propTypes = {
  anchorEl: PropTypes.object,
  children: Children,
  classes: Classes.isRequired,
  onClose: PropTypes.func.isRequired
}

ContextMenuComponent.defaultProps = {
  anchorEl: null,
  children: null
}

export const ContextMenu = withStyles(styles)(ContextMenuComponent)
