import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import SoundGalleryEmptyMessage from './SoundGalleryEmptyMessage';
import SoundGalleryItemList from '../containers/SoundGalleryItemList';
import SoundGallerySearch from '../containers/SoundGallerySearch';
import SoundGallerySpeedDial from './SoundGallerySpeedDial';
import SoundGalleryTarget from '../containers/SoundGalleryTarget';

import { Classes } from '../../proptypes';
import { GalleryTarget } from '../proptypes';

const styles = theme => ({
  layout: {
    margin: 'auto',
    maxWidth: theme.breakpoints.values.sm,
    paddingTop: 2 * theme.spacing(1),
  },
});

const SoundGallery = ({
  classes,
  librarySize,
  onAddSound,
  onAddTag,
  onBoardCreate,
  onConfigOpen,
  onGoBack,
  onLibraryOpen,
  target,
}) => {
  let content;
  if (librarySize === 0) {
    content = (
      <SoundGalleryEmptyMessage
        onConfigOpen={onConfigOpen}
        onLibraryOpen={onLibraryOpen}
      />
    );
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
    <div>
      <SoundGalleryTarget
        board={target.board}
        category={target.category}
        onGoBack={onGoBack}
      />
      <div className={classes.layout}>
        {content}
        <SoundGallerySpeedDial onBoardCreate={onBoardCreate} />
      </div>
    </div>
  );
};

SoundGallery.propTypes = {
  classes: Classes.isRequired,
  librarySize: PropTypes.number.isRequired,
  onAddSound: PropTypes.func.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onBoardCreate: PropTypes.func.isRequired,
  onConfigOpen: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  onLibraryOpen: PropTypes.func.isRequired,
  target: GalleryTarget,
};

SoundGallery.defaultProps = {
  GalleryTarget: null,
}

export default withStyles(styles)(SoundGallery);
