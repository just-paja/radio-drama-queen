import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import MenuIcon from '@material-ui/icons/Menu'
import OpenLibraryButton from '../soundModules/containers/OpenLibraryButton'
import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Toolbar from '@material-ui/core/Toolbar'
import WipeLibraryButton from '../soundModules/containers/WipeLibraryButton'

import { Classes } from '../proptypes'
import { withStyles } from '@material-ui/core/styles'
import {
  WorkspaceLoadFromButton,
  WorkspaceSaveAsButton,
  WorkspaceSaveButton
} from '../soundWorkspaces/components'

const styles = {
  list: {
    width: 250
  }
}

class AppMenu extends React.Component {
  static propTypes = {
    classes: Classes.isRequired
  }

  state = {
    drawerOpen: false
  }

  constructor () {
    super()
    this.handleMenuOpen = this.handleMenuOpen.bind(this)
    this.handleMenuClose = this.handleMenuClose.bind(this)
  }

  handleMenuOpen () {
    this.setState({ drawerOpen: true })
  }

  handleMenuClose () {
    this.setState({ drawerOpen: false })
  }

  render () {
    const { classes } = this.props
    const { drawerOpen } = this.state
    const menuItems = []

    menuItems.push(<WorkspaceLoadFromButton button buttonComponent={ListItem} key='loadFrom' />)
    menuItems.push(<OpenLibraryButton button buttonComponent={ListItem} key='open' />)
    menuItems.push(<WorkspaceSaveButton button buttonComponent={ListItem} key='save' />)
    menuItems.push(<WorkspaceSaveAsButton button buttonComponent={ListItem} key='saveAs' />)
    menuItems.push(<Divider key='dividerOps' />)
    menuItems.push(<WipeLibraryButton button buttonComponent={ListItem} key='wipe' />)

    return (
      <AppBar position='static'>
        <Toolbar>
          <IconButton onClick={this.handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            open={drawerOpen}
            onClose={this.handleMenuClose}
            onOpen={this.handleMenuOpen}
          >
            <div
              className={classes.list}
              onClick={this.handleMenuClose}
              onKeyDown={this.handleMenuClose}
              role='button'
              tabIndex={0}
            >
              <List>
                {menuItems}
              </List>
            </div>
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(AppMenu)
