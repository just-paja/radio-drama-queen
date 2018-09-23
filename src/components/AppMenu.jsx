import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';

import { withStyles } from '@material-ui/core/styles';

import OpenLibraryButton from '../soundModules/containers/OpenLibraryButton';
import WorkspaceSelection from '../soundWorkspaces/containers/WorkspaceSelection';

import { Classes } from '../proptypes';

const styles = {
  list: {
    width: 250,
  },
};


class AppMenu extends Component {
  constructor() {
    super();
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.state = { drawerOpen: false };
  }

  handleMenuOpen() {
    this.setState({ drawerOpen: true });
  }

  handleMenuClose() {
    this.setState({ drawerOpen: false });
  }

  render() {
    const { classes } = this.props;
    const { drawerOpen } = this.state;
    const menuItems = [];

    menuItems.push(<OpenLibraryButton button buttonComponent={ListItem} key="open" />);

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={this.handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <WorkspaceSelection />
          <SwipeableDrawer
            open={drawerOpen}
            onClose={this.handleMenuClose}
            onOpen={this.handleMenuOpen}
          >
            <div
              className={classes.list}
              onClick={this.handleMenuClose}
              onKeyDown={this.handleMenuClose}
              role="button"
              tabIndex={0}
            >
              <List>
                {menuItems}
              </List>
            </div>
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
    );
  }
}

AppMenu.propTypes = {
  classes: Classes.isRequired,
};

export default withStyles(styles)(AppMenu);
