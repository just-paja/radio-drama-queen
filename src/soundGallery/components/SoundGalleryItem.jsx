import AddCircle from '@material-ui/icons/AddCircle';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import React from 'react';

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

const SoundGalleryItem = ({ classes, sound }) => (
  <div className={classes.item}>
    <div className={classes.controls}>
      <AddCircle />
      <PlayCircleFilled />
    </div>
    <div>
      <span>{sound.name}</span>
      <div className={classes.tags}>
        {sound.tags.map(tag => (
          <SoundTag tag={tag} key={tag.name} />
        ))}
      </div>
    </div>
  </div>
);

SoundGalleryItem.propTypes = {
  classes: Classes.isRequired,
  sound: GallerySound.isRequired,
};

export default withStyles(styles)(SoundGalleryItem);
