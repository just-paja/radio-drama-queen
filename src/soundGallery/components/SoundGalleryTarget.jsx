import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Classes } from '../../proptypes';
import { SoundBoard } from '../../soundBoards/proptypes';
import { SoundCategory } from '../../soundCategories/proptypes';

const styles = (theme) => ({
  target: {
    background: theme.palette.grey[300],
  },
  container: {
    margin: 'auto',
    maxWidth: theme.breakpoints.values.sm,
    display: 'flex',
  },
  text: {
    margin: 'auto',
  },
});

const SoundGalleryTarget = ({
  classes,
  board,
  category,
  onGoBack,
}) => {
  if (!board) {
    return null;
  }
  const boardLabel = board ? (
    <span>{board.name}</span>
  ) : null
  const categoryLabel = board && category ? (
    <span>
      {' '}&gt;{' '}
      {category && (category.name || 'Default')}
    </span>
  ) : null;
  return (
    <div className={classes.target}>
      <div className={classes.container}>
        <IconButton onClick={onGoBack}>
          <ArrowBack />
        </IconButton>
        <div className={classes.text}>
          Adding sounds to:{' '}
          {boardLabel}
          {categoryLabel}
        </div>
      </div>
    </div>
  );
};

SoundGalleryTarget.propTypes = {
  board: SoundBoard,
  category: SoundCategory,
  classes: Classes.isRequired,
  onGoBack: PropTypes.func.isRequired,
};

SoundGalleryTarget.defaultProps = {
  board: null,
  category: null,
};

export default withStyles(styles)(SoundGalleryTarget);
