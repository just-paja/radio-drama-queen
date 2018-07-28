import PropTypes from 'prop-types';
import React from 'react';
import MUIIconButton from '@material-ui/core/IconButton';

const IconButton = ({ icon: Icon, ...props }) => (
  <MUIIconButton
    style={{ width: '24px', height: '24px', marginRight: '0.5rem' }}
    {...props}
  >
    <Icon style={{ width: '16px', height: '16px', fontSize: '50%' }} />
  </MUIIconButton>
);

IconButton.propTypes = {
  icon: PropTypes.func.isRequired,
};

export default IconButton;
