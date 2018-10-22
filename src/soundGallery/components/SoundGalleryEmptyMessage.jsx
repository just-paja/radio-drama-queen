import CloudDownload from '@material-ui/icons/CloudDownload';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import LabelButton from '../../components/LabelButton';
import CanvasMessage from '../../components/CanvasMessage';

const SoundGalleryEmptyMessage = ({ onConfigOpen, onLibraryOpen }) => (
  <CanvasMessage heading="Oh no! Your sound library is empty!">
    <Typography variant="body1" gutterBottom>
      The sound library stores all the sounds. You can browse and filter here.
    </Typography>
    <LabelButton onClick={onConfigOpen} icon={OpenInBrowser}>
      Open configuration
    </LabelButton>
    <LabelButton onClick={onLibraryOpen} icon={CloudDownload}>
      Download Library
    </LabelButton>
  </CanvasMessage>
);

SoundGalleryEmptyMessage.propTypes = {
  onConfigOpen: PropTypes.func.isRequired,
  onLibraryOpen: PropTypes.func.isRequired,
};

export default SoundGalleryEmptyMessage;
