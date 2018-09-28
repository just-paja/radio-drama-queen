import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import SoundGalleryEmptyMessage from './SoundGalleryEmptyMessage';
import SoundGalleryItemList from '../containers/SoundGalleryItemList';
import SoundGallerySearch from '../containers/SoundGallerySearch';
import SoundGallerySpeedDial from './SoundGallerySpeedDial';

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
  librarySize,
  onAddSound,
  onAddTag,
  onBoardCreate,
}) => {
  let content;
  if (librarySize === 0) {
    content = <SoundGalleryEmptyMessage />;
  } else {
    content = (
      <div>
        <SoundGallerySearch />
        <SoundGalleryItemList
          onSoundAdd={onAddSound}
          onTagAdd={onAddTag}
        />
      </div>
    );
  }

  return (
    <div className={classes.layout}>
      {content}
      <SoundGallerySpeedDial onBoardCreate={onBoardCreate} />
    </div>
  );
};

SoundGallery.propTypes = {
  classes: Classes.isRequired,
  librarySize: PropTypes.number.isRequired,
  onAddSound: PropTypes.func.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onBoardCreate: PropTypes.func.isRequired,
};

export default withStyles(styles)(SoundGallery);
