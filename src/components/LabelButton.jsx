import Button from '@material-ui/core/Button';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
});

const LabelButton = ({
  children,
  buttonComponent: ButtonComponent,
  icon: IconComponent,
  classes,
  ...props
}) => (
  <ButtonComponent {...props}>
    <IconComponent className={classnames(classes.leftIcon)} />
    {children}
  </ButtonComponent>
);

LabelButton.propTypes = {
  buttonComponent: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  icon: PropTypes.func.isRequired,
};

LabelButton.defaultProps = {
  buttonComponent: Button,
  children: null,
};

export default withStyles(styles)(LabelButton);
