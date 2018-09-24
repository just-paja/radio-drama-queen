import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import { SoundCategory } from '../../soundCategories/containers';

const styles = theme => ({
  gridItem: {
    margin: theme.spacing.unit,
  },
});

const SoundBoardCategory = ({
  classes,
  heading,
  children,
  uuid,
}) => (
  <Grid xs={12} sm={6} md={4} lg={3} xl={2} item elevation={0}>
    <div className={classes.gridItem}>
      {heading ? (
        <Typography variant="headline" gutterBottom>
          {heading}
        </Typography>
      ) : null}
      {uuid ? <SoundCategory uuid={uuid} /> : children}
    </div>
  </Grid>
);

SoundBoardCategory.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  heading: PropTypes.node,
  uuid: PropTypes.string,
};

SoundBoardCategory.defaultProps = {
  children: null,
  heading: null,
  uuid: null,
};

export default withStyles(styles)(SoundBoardCategory);
