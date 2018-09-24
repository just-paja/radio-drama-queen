import PropTypes from 'prop-types';
import React from 'react';

import { SoundGallery } from '../../soundGallery/containers';
import { SoundBoard } from '../../soundBoards/containers';

import { VIEW_BOARD, VIEW_LIBRARY } from '../constants';

const WorkspaceView = ({ board, onAddSoundToBoard, view }) => {
  if (view === VIEW_LIBRARY) {
    return <SoundGallery onAddSound={onAddSoundToBoard} />;
  }
  if (view === VIEW_BOARD && board) {
    return <SoundBoard uuid={board} />;
  }
  return null;
};

WorkspaceView.propTypes = {
  board: PropTypes.string,
  onAddSoundToBoard: PropTypes.func.isRequired,
  view: PropTypes.string,
};

WorkspaceView.defaultProps = {
  board: null,
  view: null,
};

export default WorkspaceView;
