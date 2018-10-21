import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/core/styles';

import { Classes, ClassName } from '../../proptypes';

const styles = theme => ({
  button: {
    height: '1em !important',
    marginRight: '0.5rem',
    padding: '0.3rem',
    width: '1em !important',
  },
  icon: {
    height: '1rem',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '1rem',
  }
});

const SoundCategoryIconButton = ({ className, classes, icon: Icon, ...props }) => (
  <IconButton
    className={classnames(classes.button, className)}
    {...props}
  >
    <Icon className={classes.icon}/>
  </IconButton>
);

SoundCategoryIconButton.propTypes = {
  classes: Classes.isRequired,
  className: ClassName,
  icon: PropTypes.func.isRequired,
};

SoundCategoryIconButton.defaultProps = {
  className: null,
};

export default withStyles(styles)(SoundCategoryIconButton);
