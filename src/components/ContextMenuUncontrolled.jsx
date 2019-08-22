import IconButton from '@material-ui/core/IconButton'
import MoreVert from '@material-ui/icons/MoreVert'
import React from 'react'

import { Children } from '../proptypes'
import { ContextMenu } from './ContextMenu'

class ContextMenuUncontrolledComponent extends React.Component {
  state = {
    anchorEl: null
  }

  constructor (props) {
    super(props)
    this.handleMenuClose = this.handleMenuClose.bind(this)
    this.handleMenuOpen = this.handleMenuOpen.bind(this)
  }

  handleMenuClose () {
    this.setState({ anchorEl: null })
  }

  handleMenuOpen (event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  render () {
    const { children } = this.props
    return (
      <>
        <IconButton onClick={this.handleMenuOpen}>
          <MoreVert />
        </IconButton>
        <ContextMenu
          anchorEl={this.state.anchorEl}
          onClose={this.handleMenuClose}
        >
          {children}
        </ContextMenu>
      </>
    )
  }
}

ContextMenuUncontrolledComponent.displaName = 'ContextMenuUncontrolled'
ContextMenuUncontrolledComponent.propTypes = {
  children: Children.isRequired
}

export const ContextMenuUncontrolled = ContextMenuUncontrolledComponent
