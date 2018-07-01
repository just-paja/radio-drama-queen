import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import AddButton from './AddButton';
import GridMessage from './GridMessage';

const NoCategoriesMessage = ({ onAdd }) => (
  <GridMessage heading="You have no sound categories defined yet!">
    <Typography variant="body1" gutterBottom>
      Sound categories help you organize sounds so you can find what you
      want to play just by visual inspection.
    </Typography>
    <AddButton onClick={onAdd}>
      Add some
    </AddButton>
  </GridMessage>
);

NoCategoriesMessage.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NoCategoriesMessage;
