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
import NoCategoriesMessage from './NoCategoriesMessage';
import SoundCategory from '../containers/SoundCategory';
import SoundCategoryCreateForm from '../containers/SoundCategoryCreateForm';
import SoundSearchForm from '../containers/SoundSearchForm';

const styles = theme => ({
  gridStretch: {
    height: '100%',
  },
  gridSpacing: {
    padding: theme.spacing.unit,
    minWidth: 320,
    alignContent: 'start',
  },
  canDrop: {
    background: 'rgba(0,0,0,.2)',
  },
});

const SoundCategoryGrid = ({
  canDrop,
  categories,
  classes,
  connectDropTarget,
  isOver,
  showCreateForm,
}) => {
  let content;
  if (categories.length === 0 && !showCreateForm) {
    content = (<NoCategoriesMessage />);
  } else {
    content = [];
    content.push(categories.map(uuid => (
      <GridCategory key={uuid}>
        <SoundCategory uuid={uuid} />
      </GridCategory>
    )));
    if (showCreateForm) {
      content.push(
        <GridCategory key="form">
          <Card>
            <CardContent>
              <Typography variant="headline">
                Create Category
              </Typography>
              <SoundCategoryCreateForm />
            </CardContent>
          </Card>
        </GridCategory>
      );
    }
  }
  return connectDropTarget(
    <div className={classes.gridStretch}>
      {categories.length > 0
        ? <SoundSearchForm key="search" />
        : null}
      <Grid
        className={classnames(classes.gridSpacing, classes.gridStretch, {
          [classes.canDrop]: isOver && canDrop,
        })}
        container
      >
        {content}
        <Snackbar
          open={canDrop && isOver}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          message="Drop audio files here to create a new category"
        />
      </Grid>
    </div>
  );
};

SoundCategoryGrid.propTypes = {
  canDrop: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool,
  showCreateForm: PropTypes.bool,
};

SoundCategoryGrid.defaultProps = {
  canDrop: false,
  isOver: false,
  showCreateForm: false,
};

export default withStyles(styles)(SoundCategoryGrid);
