import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import MenuIcon from '@material-ui/icons/Menu'
import OpenLibraryButton from '../../soundModules/containers/OpenLibraryButton'
import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import WipeLibraryButton from '../../soundModules/containers/WipeLibraryButton'

import { areSoundCategoriesEmpty } from '../../soundCategories/selectors'
import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { getActiveStoryName } from '../selectors'
import { withStyles } from '@material-ui/core/styles'
import { WorkspaceLoadFromButton } from './WorkspaceLoadFromButton'
import { WorkspaceSaveAsButton } from './WorkspaceSaveAsButton'
import { WorkspaceSaveButton } from './WorkspaceSaveButton'

const styles = {
  list: {
    width: 250
  }
}

class MainMenuComponent extends React.Component {
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
    const { activeStory, classes } = this.props
    const { drawerOpen } = this.state
    const menuItems = []

    menuItems.push(<WorkspaceLoadFromButton button buttonComponent={ListItem} key='loadFrom' />)
    menuItems.push(<OpenLibraryButton button buttonComponent={ListItem} key='open' />)
    menuItems.push(<WorkspaceSaveButton button buttonComponent={ListItem} key='save' />)
    menuItems.push(<WorkspaceSaveAsButton button buttonComponent={ListItem} key='saveAs' />)
    menuItems.push(<Divider key='dividerOps' />)
    menuItems.push(<WipeLibraryButton button buttonComponent={ListItem} key='wipe' />)

    return (
      <React.Fragment>
        <Button onClick={this.handleMenuOpen}>
          <MenuIcon />
          {' '}
          {activeStory}
        </Button>
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
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  activeStory: getActiveStoryName(state),
  isEmpty: areSoundCategoriesEmpty(state)
})

export const MainMenu = connect(
  mapStateToProps
)(withStyles(styles)(MainMenuComponent))
