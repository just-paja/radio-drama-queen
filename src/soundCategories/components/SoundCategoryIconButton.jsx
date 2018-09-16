import PropTypes from 'prop-types';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';

const SoundCategoryIconButton = ({ icon: Icon, ...props }) => (
  <IconButton
    style={{ width: '24px', height: '24px', marginRight: '0.5rem' }}
    {...props}
  >
    <Icon style={{ width: '16px', height: '16px', fontSize: '50%' }} />
  </IconButton>
);

SoundCategoryIconButton.propTypes = {
  icon: PropTypes.func.isRequired,
};

export default SoundCategoryIconButton;
