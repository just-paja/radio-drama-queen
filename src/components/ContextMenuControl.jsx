import PropTypes from 'prop-types'
import React from 'react'

import { Children } from '../proptypes'
import { ContextMenu } from './ContextMenu'
import { ContextMenuItem } from './ContextMenuItem'

export const ContextMenuOption = PropTypes.shape({
  label: PropTypes.node.isRequired,
  icon: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
})

export const ContextMenuOptions = PropTypes.arrayOf(ContextMenuOption)

class ContextMenuControlComponent extends React.Component {
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
    const { children, options } = this.props
    return (
      <>
        {React.Children.map(children, child => React.cloneElement(child, { onContextMenu: this.handleMenuOpen }))}
        <ContextMenu
          anchorEl={this.state.anchorEl}
          onClose={this.handleMenuClose}
        >
          {options && options.map(option => <ContextMenuItem {...option} key={option.label} />)}
        </ContextMenu>
      </>
    )
  }
}

ContextMenuControlComponent.displaName = 'ContextMenuControl'
ContextMenuControlComponent.propTypes = {
  children: Children.isRequired,
  options: ContextMenuOptions
}

export const ContextMenuControl = ContextMenuControlComponent
