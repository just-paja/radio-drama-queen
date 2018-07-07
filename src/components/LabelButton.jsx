import Button from '@material-ui/core/Button';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

const LabelButton = ({
  children,
  icon: IconComponent,
  classes,
  ...props
}) => (
  <Button {...props}>
    <IconComponent className={classnames(classes.leftIcon)} />
    {children}
  </Button>
);

LabelButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  icon: PropTypes.func.isRequired,
};

LabelButton.defaultProps = {
  children: null,
};

export default withStyles(styles)(LabelButton);
