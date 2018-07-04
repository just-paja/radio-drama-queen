import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import GridCategory from './GridCategory';
import SoundCategory from '../containers/SoundCategory';
import SoundCategoryCreateForm from '../containers/SoundCategoryCreateForm';
import NoCategoriesMessage from './NoCategoriesMessage';

const styles = theme => ({
  gridStretch: {
    height: '100%',
  },
  gridSpacing: {
    padding: 2 * theme.spacing.unit,
    minWidth: 320,
  },
  canDrop: {
    background: 'rgba(0,0,0,.2)',
  },
});

const SoundCategoryGrid = ({
  connectDropTarget,
  categories,
  classes,
  canDrop,
  showCreateForm,
}) => {
  let content;
  if (categories.length === 0 && !showCreateForm) {
    content = (<NoCategoriesMessage />);
  } else {
    content = [
      categories.map(uuid => (
        <GridCategory key={uuid}>
          <SoundCategory uuid={uuid} />
        </GridCategory>
      )),
      showCreateForm ? (
        <GridCategory>
          <Card>
            <CardContent>
              <Typography variant="headline">
                Create Category
              </Typography>
              <SoundCategoryCreateForm />
            </CardContent>
          </Card>
        </GridCategory>
      ) : null,
    ];
  }
  return connectDropTarget(
    <div className={classes.gridStretch}>
      <Grid
        className={classnames(classes.gridSpacing, classes.gridStretch, {
          [classes.canDrop]: canDrop,
        })}
        container
      >
        {content}
        <Snackbar
          open={canDrop}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          message="Drop audio files here to create a new category"
        />
      </Grid>
    </div>
  );
};

SoundCategoryGrid.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  canDrop: PropTypes.bool,
  showCreateForm: PropTypes.bool,
};

SoundCategoryGrid.defaultProps = {
  canDrop: false,
  showCreateForm: false,
};

export default withStyles(styles)(SoundCategoryGrid);
