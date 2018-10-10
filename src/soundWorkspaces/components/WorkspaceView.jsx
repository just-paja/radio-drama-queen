import PropTypes from 'prop-types';
import React from 'react';

import SoundBoardView from '../containers/SoundBoardView';
import SoundGalleryView from '../containers/SoundGalleryView';

import { VIEW_BOARD, VIEW_LIBRARY } from '../constants';

const WorkspaceView = ({ board, view }) => {
  if (view === VIEW_LIBRARY) {
    return <SoundGalleryView />;
  }
  if (view === VIEW_BOARD && board) {
    return <SoundBoardView board={board} />;
  }
  return null;
};

WorkspaceView.propTypes = {
  board: PropTypes.string,
  view: PropTypes.string,
};

WorkspaceView.defaultProps = {
  board: null,
  view: null,
};

export default WorkspaceView;
