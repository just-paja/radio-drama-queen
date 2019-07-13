import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import { categoryStore } from '../../soundCategories'
import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { OpenLibraryButton } from '../../soundLibraries/components'
import { withStyles } from '@material-ui/core/styles'
import { WorkspaceLoadFromButton } from './WorkspaceLoadFromButton'
import { WorkspaceWipeButton } from './WorkspaceWipeButton'

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
    const { classes } = this.props
    const { drawerOpen } = this.state
    return (
      <React.Fragment>
        <Button onClick={this.handleMenuOpen}>
          <MenuIcon />
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
              <WorkspaceLoadFromButton button buttonComponent={ListItem} />
              <OpenLibraryButton button buttonComponent={ListItem} />
              <Divider />
              <WorkspaceWipeButton button buttonComponent={ListItem} />
            </List>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    )
  }
}

MainMenuComponent.propTypes = {
  classes: Classes.isRequired
}

const mapStateToProps = state => ({
  isEmpty: categoryStore.isEmpty(state)
})

export const MainMenu = connect(
  mapStateToProps
)(withStyles(styles)(MainMenuComponent))
