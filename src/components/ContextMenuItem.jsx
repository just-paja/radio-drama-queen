import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'
import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import { Classes } from '../proptypes'

const styles = theme => ({
  item: {
    alignItems: 'center',
    cursor: 'default',
    display: 'flex',
    fontSize: theme.spacing(3 / 2),
    height: theme.spacing(4),
    lineHeight: 1,
    minHeight: theme.spacing(4),
    paddingBottom: 0,
    paddingLeft: theme.spacing(3 / 2),
    paddingRight: theme.spacing(2),
    paddingTop: 0
  },
  icon: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    fontSize: theme.spacing(2),
    marginRight: theme.spacing(1)
  }
})

class ContextMenuItemComponent extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onClick()
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  render () {
    const { classes, icon: Icon, label } = this.props
    return (
      <MenuItem className={classes.item} onClick={this.handleClick}>
        <Icon className={classes.icon} />
        <div>{label}</div>
      </MenuItem>
    )
  }
}

ContextMenuItemComponent.displaName = 'ContextMenuItem'
ContextMenuItemComponent.propTypes = {
  classes: Classes.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
  label: PropTypes.node.isRequired
}

ContextMenuItemComponent.defaultProps = {
  anchorEl: null,
  children: null
}

export const ContextMenuItem = withStyles(styles)(ContextMenuItemComponent)
