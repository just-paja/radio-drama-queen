import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import SoundBoardCategory from './SoundBoardCategory';
import SoundBoardCategoryCreate from '../containers/SoundBoardCategoryCreate';
import SoundBoardEmptyMessage from './SoundBoardEmptyMessage';
import SoundBoardRenameDialog from '../containers/SoundBoardRenameDialog';
import SoundBoardSpeedDial from '../containers/SoundBoardSpeedDial';

const styles = theme => ({
  board: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  gridSpacing: {
    padding: theme.spacing(1),
    minWidth: 320,
    alignContent: 'start',
  },
  canDrop: {
    background: 'rgba(0,0,0,.2)',
  },
});

const renderCategories = (categories, onSoundPickerOpen) =>
  categories.map(categoryUuid => (
    <SoundBoardCategory
      key={categoryUuid}
      onSoundPickerOpen={onSoundPickerOpen}
      uuid={categoryUuid}
    />
  ));

const renderCreateForm = uuid => (
  <SoundBoardCategory key="form">
    <Card>
      <CardContent>
        <Typography variant="h5">
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

class SoundBoard extends Component {
  constructor() {
    super();
    this.handleSoundPickerOpen = this.handleSoundPickerOpen.bind(this);
  }

  handleSoundPickerOpen() {
    const { uuid, onSoundPickerOpen } = this.props;
    onSoundPickerOpen({
      board: uuid,
    });
  }

  render() {
    const {
      canDrop,
      categories,
      classes,
      connectDropTarget,
      isOver,
      onSoundPickerOpen,
      showCreateForm,
      uuid,
    } = this.props;
    const gridClasses = classnames(classes.grow, classes.gridSpacing, {
      [classes.canDrop]: isOver && canDrop,
    });
    let content;
    if (categories.length === 0 && !showCreateForm) {
      content = (<SoundBoardEmptyMessage />);
    } else {
      content = [];
      content.push(renderCategories(categories, onSoundPickerOpen));
      if (showCreateForm) {
        content.push(renderCreateForm(uuid));
      }
    }
    // Wrapping div is necessary for react-dnd
    return connectDropTarget(
      <div className={classes.board}>
        <SoundBoardRenameDialog boardUuid={uuid} />
        <Grid className={gridClasses} container>
          {content}
          <SoundBoardSpeedDial
            boardUuid={uuid}
            onSoundAdd={this.handleSoundPickerOpen}
          />
          {renderSnackbar(isOver, canDrop)}
        </Grid>
      </div>
    );
  };
};

SoundBoard.propTypes = {
  canDrop: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool,
  onSoundPickerOpen: PropTypes.func.isRequired,
  showCreateForm: PropTypes.bool,
  uuid: PropTypes.string,
};

SoundBoard.defaultProps = {
  canDrop: false,
  isOver: false,
  showCreateForm: false,
};

export default withStyles(styles)(SoundBoard);
