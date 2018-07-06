import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  gridItem: {
    margin: theme.spacing.unit,
  },
});

const GridCategory = ({ children, classes, heading }) => (
  <Grid xs={12} sm={6} md={4} lg={3} xl={2} item elevation={0}>
    <div className={classes.gridItem}>
      {heading ? (
        <Typography variant="headline" gutterBottom>
          {heading}
        </Typography>
      ) : null}
      {children}
    </div>
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
