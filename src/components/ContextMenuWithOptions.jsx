import Menu from '@material-ui/core/Menu'
import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../proptypes'
import { withStyles } from '@material-ui/core/styles'
import { ContextMenuItem } from './ContextMenuItem'

const styles = {
  menu: {
    paddingBottom: 0,
    paddingTop: 0
  }
}

const ContextMenuWithOptionsComponent = ({ anchorEl, options, classes, onClose }) => (
  <Menu
    anchorEl={anchorEl}
    classes={{ list: classes.menu }}
    onClose={onClose}
    open={Boolean(anchorEl)}
  >
    {options.map(option => (
      <ContextMenuItem
        icon={option.icon}
        key={option.label}
        label={option.label}
        // eslint-disable-next-line react/jsx-handler-names
        onClick={option.onClick}
        onClose={onClose}
        shortcuts={option.shortcuts}
      />
    ))}
  </Menu>
)

ContextMenuWithOptionsComponent.displaName = 'ContextMenuWithOptions'
ContextMenuWithOptionsComponent.propTypes = {
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  classes: Classes.isRequired
}

ContextMenuWithOptionsComponent.defaultProps = {
  anchorEl: null
}

export const ContextMenuWithOptions = withStyles(styles)(ContextMenuWithOptionsComponent)
