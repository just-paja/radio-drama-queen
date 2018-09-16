import PropTypes from 'prop-types';
import React from 'react';
import Save from '@material-ui/icons/Save';

import LabelButton from './LabelButton';

const SaveButton = ({ children, ...props }) => (
  <LabelButton icon={Save} {...props}>
    {children}
  </LabelButton>
);

SaveButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

SaveButton.defaultProps = {
  children: null,
};

export default SaveButton;
