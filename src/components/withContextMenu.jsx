import React from 'react'

export function withContextMenu ({ menuComponent: MenuComponent }) {
  return function (Component) {
    class WithContextMenu extends React.Component {
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
        const { anchorEl } = this.state
        const { focused, ...other } = this.props
        return (
          <>
            <Component
              onContextMenu={this.handleMenuOpen}
              focused={anchorEl ? false : this.props.focused}
              {...other}
            />
            <MenuComponent
              anchorEl={anchorEl}
              onClose={this.handleMenuClose}
              onOpen={this.handleMenuOpen}
              {...other}
            />
          </>
        )
      }
    }

    WithContextMenu.displayName = `ContextMenu(${Component.displayName})`
    return WithContextMenu
  }
}
