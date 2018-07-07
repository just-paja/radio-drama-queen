import PropTypes from 'prop-types';
import React from 'react';
import Add from '@material-ui/icons/Add';

import LabelButton from './LabelButton';

const AddButton = ({ children, ...props }) => (
  <LabelButton icon={Add} {...props}>
    {children}
  </LabelButton>
);

AddButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

AddButton.defaultProps = {
  children: null,
};

export default AddButton;
