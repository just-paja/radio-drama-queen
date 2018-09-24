import React from 'react';
import Typography from '@material-ui/core/Typography';

import SoundBoardMessage from './SoundBoardMessage';

const SoundBoardEmptyMessage = () => (
  <SoundBoardMessage heading="You don't have any sound categories defined!">
    <Typography variant="body1" gutterBottom>
      Sound categories help you organize sounds so you can find what you
      want to play just by visual inspection.
    </Typography>
  </SoundBoardMessage>
);

export default SoundBoardEmptyMessage;
