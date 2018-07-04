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

const SaveButton = ({ classes }) => (
  <Button type="submit">
    <Save className={classnames(classes.leftIcon)} />
    Save
  </Button>
);

SaveButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(SaveButton);
