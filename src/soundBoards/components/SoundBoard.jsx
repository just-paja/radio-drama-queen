import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import SoundBoardCategory from './SoundBoardCategory';
import SoundBoardCategoryCreate from '../containers/SoundBoardCategoryCreate';
import SoundBoardEmptyMessage from './SoundBoardEmptyMessage';
import SoundBoardSpeedDial from '../containers/SoundBoardSpeedDial';

const styles = theme => ({
  gridSpacing: {
    padding: theme.spacing.unit,
    minWidth: 320,
    alignContent: 'start',
  },
  canDrop: {
    background: 'rgba(0,0,0,.2)',
  },
});

const renderCategories = categories => categories.map(categoryUuid => (
  <SoundBoardCategory
    key={categoryUuid}
    uuid={categoryUuid}
  />
));

const renderCreateForm = uuid => (
  <SoundBoardCategory key="form">
    <Card>
      <CardContent>
        <Typography variant="headline">
          Create Category
        </Typography>
        <SoundBoardCategoryCreate board={uuid} />
      </CardContent>
    </Card>
  </SoundBoardCategory>
);

const renderSnackbar = (isOver, canDrop) => (
  <Snackbar
    open={canDrop && isOver}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    message="Drop sounds here to create a new category"
  />
);

const SoundBoard = ({
  canDrop,
  categories,
  classes,
  connectDropTarget,
  isOver,
  showCreateForm,
  uuid,
}) => {
  const gridClasses = classnames(classes.gridSpacing, {
    [classes.canDrop]: isOver && canDrop,
  });
  let content;
  if (categories.length === 0 && !showCreateForm) {
    content = (<SoundBoardEmptyMessage />);
  } else {
    content = [];
    content.push(renderCategories(categories));
    if (showCreateForm) {
      content.push(renderCreateForm(uuid));
    }
  }
  return connectDropTarget(
    <Grid className={gridClasses} container>
      {content}
      <SoundBoardSpeedDial board={uuid} />
      {renderSnackbar(isOver, canDrop)}
    </Grid>
  );
};

SoundBoard.propTypes = {
  canDrop: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool,
  showCreateForm: PropTypes.bool,
  uuid: PropTypes.string,
};

SoundBoard.defaultProps = {
  canDrop: false,
  isOver: false,
  showCreateForm: false,
};

export default withStyles(styles)(SoundBoard);
