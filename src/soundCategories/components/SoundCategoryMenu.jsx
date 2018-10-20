import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Delete from '@material-ui/icons/Delete';
import TextFields from '@material-ui/icons/TextFields';
import Add from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVert from '@material-ui/icons/MoreVert';

import SoundCategoryIconButton from './SoundCategoryIconButton';

class SoundCategoryMenu extends Component {
  constructor() {
    super();
    this.handleAddSound = this.handleAddSound.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleRename = this.handleRename.bind(this);
    this.state = {
      menuAnchor: null,
    };
  }

  handleAddSound() {
    const { onSoundPickerOpen, boardUuid, uuid } = this.props;
    this.handleMenuClose();
    onSoundPickerOpen({
      board: boardUuid,
      category: uuid,
    });
  }

  handleMenuClose() {
    this.setState({ menuAnchor: null });
  }

  handleMenuOpen(event) {
    this.setState({ menuAnchor: event.currentTarget });
  }

  handleRemove() {
    const { onRemove, uuid } = this.props;
    this.handleMenuClose();
    onRemove(uuid);
  }

  handleRename() {
    const { onRename, uuid } = this.props;
    this.handleMenuClose();
    onRename(uuid);
  }

  render() {
    const { menuAnchor } = this.state;
    return (
      <div>
        <SoundCategoryIconButton
          onClick={this.handleMenuOpen}
          icon={MoreVert}
        />
        <Menu
          anchorEl={menuAnchor}
          onClose={this.handleMenuClose}
          open={Boolean(menuAnchor)}
        >
          <MenuItem onClick={this.handleAddSound}>
            <Add />
            <ListItemText primary="Add sounds" />
          </MenuItem>
          <MenuItem onClick={this.handleRename}>
            <TextFields />
            <ListItemText primary="Rename" />
          </MenuItem>
          <MenuItem onClick={this.handleRemove}>
            <Delete />
            <ListItemText primary="Remove" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

SoundCategoryMenu.propTypes = {
  boardUuid: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
  onSoundPickerOpen: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default SoundCategoryMenu;
