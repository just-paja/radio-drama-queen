import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  messageSize: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 600,
  },
};

const GridMessage = ({ children, classes, heading }) => (
  <Paper className={classes.messageSize} elevation={0}>
    <Typography variant="headline" gutterBottom>
      {heading}
    </Typography>
    {children}
  </Paper>
);

GridMessage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  heading: PropTypes.node.isRequired,
};

export default withStyles(styles)(GridMessage);
