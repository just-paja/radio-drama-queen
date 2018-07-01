import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import React from 'react';

const SemanticFormField = ({
  children,
}) => (
  <FormHelperText>
    {children}
  </FormHelperText>
);

SemanticFormField.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

SemanticFormField.defaultProps = {
  children: null,
};

export default SemanticFormField;
