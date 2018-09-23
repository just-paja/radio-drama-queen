import PropTypes from 'prop-types';
import React from 'react';
import Delete from '@material-ui/icons/Delete';

import LabelButton from './LabelButton';

const DeleteButton = ({ children, ...props }) => (
  <LabelButton icon={Delete} {...props}>
    {children}
  </LabelButton>
);

DeleteButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

DeleteButton.defaultProps = {
  children: null,
};

export default DeleteButton;
