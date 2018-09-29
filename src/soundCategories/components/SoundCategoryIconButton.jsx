import PropTypes from 'prop-types';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';

const SoundCategoryIconButton = ({ icon: Icon, ...props }) => (
  <IconButton
    style={{ width: '32px', height: '32px', marginRight: '0.5rem', padding: '0.25rem' }}
    {...props}
  >
    <Icon style={{ width: '20px', height: '20px', fontSize: '50%' }} />
  </IconButton>
);

SoundCategoryIconButton.propTypes = {
  icon: PropTypes.func.isRequired,
};

export default SoundCategoryIconButton;
