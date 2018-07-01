import Button from '@material-ui/core/Button';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Save from '@material-ui/icons/Save';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

const AddButton = ({ children, classes, ...props }) => (
  <Button variant="contained" size="small" {...props}>
    <Save className={classnames(classes.leftIcon)} />
    {children}
  </Button>
);

AddButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

AddButton.defaultProps = {
  children: null,
};

export default withStyles(styles)(AddButton);
