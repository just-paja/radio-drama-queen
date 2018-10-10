import PropTypes from 'prop-types';
import React from 'react';

import { SoundBoard } from '../../soundBoards/containers';

const SoundBoardView = ({
  board,
  onSoundPickerOpen,
}) => (
  <SoundBoard
    onSoundPickerOpen={onSoundPickerOpen}
    uuid={board}
  />
);

SoundBoardView.propTypes = {
  board: PropTypes.string,
  onSoundPickerOpen: PropTypes.func.isRequired,
};

SoundBoardView.defaultProps = {
  board: null,
};

export default SoundBoardView;
