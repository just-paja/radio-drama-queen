import AddCircle from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import SoundTag from '../../tags/containers/SoundTag';

import { GallerySound } from '../proptypes';
import { Classes } from '../../proptypes';

const styles = theme => ({
  controls: {
    marginRight: theme.spacing.unit,
  },
  item: {
    display: 'flex',
    alignItems: 'top',
  },
  tags: {
    color: theme.palette.text.hint,
  },
});

class SoundGalleryItem extends Component {
  constructor() {
    super();
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const { onAdd, soundUuid } = this.props;
    onAdd(soundUuid);
  }

  handlePlayClick() {
    const { onPlay, soundUuid } = this.props;
    onPlay(soundUuid);
  }

  render() {
    const { classes, sound } = this.props;
    return (
      <div className={classes.item}>
        <div className={classes.controls}>
          <IconButton onClick={this.handleAdd}>
            <AddCircle />
          </IconButton>
          <IconButton onClick={this.handlePlayClick}>
            <PlayCircleFilled />
          </IconButton>
        </div>
        <div>
          <span>{sound.name}</span>
          <div className={classes.tags}>
            {sound.tags.map(tag => (
              <SoundTag tag={tag} key={tag} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

SoundGalleryItem.propTypes = {
  classes: Classes.isRequired,
  onAdd: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  sound: GallerySound.isRequired,
  soundUuid: PropTypes.string.isRequired,
};

export default withStyles(styles)(SoundGalleryItem);
