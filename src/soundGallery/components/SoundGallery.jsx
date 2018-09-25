import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import SoundGallerySearch from '../containers/SoundGallerySearch';
import SoundGalleryItemList from '../containers/SoundGalleryItemList';
import SoundGalleryEmptyMessage from './SoundGalleryEmptyMessage';

import { Classes } from '../../proptypes';

const styles = theme => ({
  layout: {
    margin: 'auto',
    maxWidth: theme.breakpoints.values.sm,
    paddingTop: 2 * theme.spacing.unit,
  },
});

const SoundGallery = ({
  classes,
  onAddSound,
  onAddTag,
  librarySize,
}) => {
  if (librarySize === 0) {
    return <SoundGalleryEmptyMessage />;
  }

  return (
    <div className={classes.layout}>
      <SoundGallerySearch />
      <SoundGalleryItemList
        onSoundAdd={onAddSound}
        onTagAdd={onAddTag}
      />
    </div>
  );
};

SoundGallery.propTypes = {
  classes: Classes.isRequired,
  librarySize: PropTypes.number.isRequired,
  onAddSound: PropTypes.func.isRequired,
  onAddTag: PropTypes.func.isRequired,
};

export default withStyles(styles)(SoundGallery);
