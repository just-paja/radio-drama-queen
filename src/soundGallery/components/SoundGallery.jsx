import PropTypes from 'prop-types';
import React from 'react';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

import SoundGalleryItem from '../containers/SoundGalleryItem';
import SoundGalleryEmptyMessage from './SoundGalleryEmptyMessage';

import { GallerySound } from '../proptypes';
import { Classes } from '../../proptypes';

const styles = theme => ({
  layout: {
    margin: 'auto',
    maxWidth: theme.breakpoints.values.sm,
    paddingTop: 2 * theme.spacing.unit,
  },
  body: {
    padding: theme.spacing.unit,
  },
});

const SoundGallery = ({ classes, sounds }) => {
  if (sounds.length === 0) {
    return <SoundGalleryEmptyMessage />;
  }

  return (
    <div className={classes.layout}>
      <Paper className={classes.body}>
        {sounds.map(sound => (
          <SoundGalleryItem
            soundUuid={sound.uuid}
            key={sound.uuid}
          />
        ))}
      </Paper>
    </div>
  );
};

SoundGallery.propTypes = {
  classes: Classes.isRequired,
  sounds: PropTypes.arrayOf(GallerySound).isRequired,
};

export default withStyles(styles)(SoundGallery);
