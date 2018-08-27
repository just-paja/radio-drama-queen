import React from 'react';
import Typography from '@material-ui/core/Typography';

import AddCategoryButton from '../containers/AddCategoryButton';
import OpenLibraryButton from '../containers/OpenLibraryButton';
import GridMessage from './GridMessage';

const NoCategoriesMessage = () => (
  <GridMessage heading="You don't have any sound categories defined!">
    <Typography variant="body1" gutterBottom>
      Sound categories help you organize sounds so you can find what you
      want to play just by visual inspection.
    </Typography>
    <OpenLibraryButton variant="contained" />
    <AddCategoryButton variant="contained" />
  </GridMessage>
);

export default NoCategoriesMessage;
