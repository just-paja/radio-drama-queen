import PropTypes from 'prop-types';
import React from 'react';

import SoundGallery from '../../soundGallery/containers/SoundGallery';
import SoundCategoryGrid from '../../soundCategories/containers/SoundCategoryGrid';

import { VIEW_BOARD, VIEW_LIBRARY } from '../constants';

const WorkspaceView = ({ view }) => {
  if (view === VIEW_LIBRARY) {
    return <SoundGallery />;
  }
  if (view === VIEW_BOARD) {
    return <SoundCategoryGrid />;
  }
  return null;
};

WorkspaceView.propTypes = {
  view: PropTypes.string,
};

WorkspaceView.defaultProps = {
  view: null,
};

export default WorkspaceView;
