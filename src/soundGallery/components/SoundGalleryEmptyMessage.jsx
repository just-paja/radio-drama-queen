import FolderOpen from '@material-ui/icons/FolderOpen';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import LabelButton from '../../components/LabelButton';
import CanvasMessage from '../../components/CanvasMessage';

const SoundGalleryEmptyMessage = ({ onLibraryOpen }) => (
  <CanvasMessage heading="Oh no! Your sound library is empty!">
    <Typography variant="body1" gutterBottom>
      The sound library stores all the sounds. You can browse and filter here.
    </Typography>
    <LabelButton onClick={onLibraryOpen} icon={FolderOpen}>
      Open Library
    </LabelButton>
  </CanvasMessage>
);

SoundGalleryEmptyMessage.propTypes = {
  onLibraryOpen: PropTypes.func.isRequired,
};

export default SoundGalleryEmptyMessage;
