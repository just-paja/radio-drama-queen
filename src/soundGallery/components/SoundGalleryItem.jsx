import AddCircle from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import SoundTag from '../../soundTags/containers/SoundTag';

import { SoundStatusIcon } from '../../sounds/components';
import { GallerySound } from '../proptypes';
import { Classes } from '../../proptypes';

const styles = theme => ({
  controls: {
    marginRight: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    display: 'flex',
    alignItems: 'top',
  },
});

class SoundGalleryItem extends Component {
  constructor() {
    super();
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
  }

  handleAdd() {
    const { onAdd, sound: { uuid }, target } = this.props;
    onAdd(uuid, { target });
  }

  handleAddTag(tag) {
    const { onAddTag, target } = this.props;
    onAddTag(tag, { target });
  }

  handlePlayClick() {
    const { onPlay, sound: { uuid } } = this.props;
    onPlay(uuid);
  }

  render() {
    const { classes, sound } = this.props;
    return (
      <div className={classes.item}>
        <div className={classes.controls}>
          <IconButton disabled={sound.isUsed || sound.error} onClick={this.handleAdd}>
            <AddCircle />
          </IconButton>
          <IconButton onClick={this.handlePlayClick}>
            <SoundStatusIcon
              error={sound.error}
              loading={sound.loading}
              playing={sound.playing}
              size={22}
              valid
            />
          </IconButton>
        </div>
        <div>
          <span>{sound.name}</span>
          <div className={classes.tags}>
            {sound.tags.reduce((aggr, tag) => [
              ...aggr,
              <SoundTag
                key={tag}
                onClick={this.handleAddTag}
                tag={tag}
              />,
              ' ',
            ], [])}
          </div>
        </div>
      </div>
    );
  }
}

SoundGalleryItem.propTypes = {
  classes: Classes.isRequired,
  onAdd: PropTypes.func.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  sound: GallerySound.isRequired,
};

export default withStyles(styles)(SoundGalleryItem);
