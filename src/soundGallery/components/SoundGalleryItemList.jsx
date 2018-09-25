import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import SoundGalleryItem from './SoundGalleryItem';

import { GallerySound } from '../proptypes';
import { Classes } from '../../proptypes';

const styles = theme => ({
  body: {
    padding: theme.spacing.unit,
  },
});

const SoundGalleryItemList = ({
  classes,
  onSoundAdd,
  onSoundPlay,
  sounds,
}) => (
  <Paper className={classes.body}>
    {sounds.map(sound => (
      <SoundGalleryItem
        key={sound.uuid}
        onPlay={onSoundPlay}
        onAdd={onSoundAdd}
        sound={sound}
      />
    ))}
  </Paper>
);

SoundGalleryItemList.propTypes = {
  classes: Classes.isRequired,
  onSoundAdd: PropTypes.func.isRequired,
  onSoundPlay: PropTypes.func.isRequired,
  sounds: PropTypes.arrayOf(GallerySound).isRequired,
};

export default withStyles(styles)(SoundGalleryItemList);
