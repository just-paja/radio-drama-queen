import React from 'react';
import Typography from '@material-ui/core/Typography';

import CanvasMessage from '../../components/CanvasMessage';

const SoundGalleryEmptyMessage = () => (
  <CanvasMessage heading="Oh no! Your sound library is empty!">
    <Typography variant="body1" gutterBottom>
      The sound library stores all the sounds. You can browse and filter here.
    </Typography>
  </CanvasMessage>
);

export default SoundGalleryEmptyMessage;
