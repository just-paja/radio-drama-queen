import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  messageSize: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit,
    maxWidth: 600,
  },
});

const CanvasMessage = ({ children, classes, heading }) => (
  <Paper className={classes.messageSize} elevation={0}>
    <Typography variant="h5" gutterBottom>
      {heading}
    </Typography>
    <div>
      {children}
    </div>
  </Paper>
);

CanvasMessage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  heading: PropTypes.node.isRequired,
};

export default withStyles(styles)(CanvasMessage);
