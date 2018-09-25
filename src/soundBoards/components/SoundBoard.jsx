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
import SoundSearchForm from '../../containers/SoundSearchForm';

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

const SoundBoard = ({
  canDrop,
  categories,
  classes,
  connectDropTarget,
  isOver,
  showCreateForm,
  uuid,
}) => {
  let content;
  if (categories.length === 0 && !showCreateForm) {
    content = (<SoundBoardEmptyMessage />);
  } else {
    content = [];
    content.push(categories.map(categoryUuid => (
      <SoundBoardCategory
        key={categoryUuid}
        uuid={categoryUuid}
      />
    )));
    if (showCreateForm) {
      content.push(
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
    }
  }
  return connectDropTarget(
    <div>
      {categories.length > 0
        ? <SoundSearchForm key="search" />
        : null}
      <SoundBoardSpeedDial board={uuid} />
      <Grid
        className={classnames(classes.gridSpacing, {
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
