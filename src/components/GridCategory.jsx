import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  gridItem: {},
};

const GridCategory = ({ children, classes, heading }) => (
  <Grid item className={classes.gridItem} elevation={0}>
    {heading ? (
      <Typography variant="headline" gutterBottom>
        {heading}
      </Typography>
    ) : null}
    {children}
  </Grid>
);

GridCategory.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  heading: PropTypes.node,
};

GridCategory.defaultProps = {
  heading: null,
};

export default withStyles(styles)(GridCategory);
