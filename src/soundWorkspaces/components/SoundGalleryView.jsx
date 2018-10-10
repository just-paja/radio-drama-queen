import PropTypes from 'prop-types';
import React from 'react';

import { SoundGallery } from '../../soundGallery/containers';

const SoundGalleryView = ({
  onAddSoundToBoard,
  onAddTagToBoard,
  onBoardCreate,
  onGalleryGoBack,
  onLibraryOpen,
}) => (
  <SoundGallery
    onAddSound={onAddSoundToBoard}
    onAddTag={onAddTagToBoard}
    onBoardCreate={onBoardCreate}
    onGoBack={onGalleryGoBack}
    onLibraryOpen={onLibraryOpen}
  />
);

SoundGalleryView.propTypes = {
  onAddSoundToBoard: PropTypes.func.isRequired,
  onAddTagToBoard: PropTypes.func.isRequired,
  onBoardCreate: PropTypes.func.isRequired,
  onGalleryGoBack: PropTypes.func.isRequired,
  onLibraryOpen: PropTypes.func.isRequired,
};

SoundGalleryView.defaultProps = {
  target: null,
};

export default SoundGalleryView;
