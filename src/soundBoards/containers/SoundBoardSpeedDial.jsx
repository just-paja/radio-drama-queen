import { connect } from 'react-redux';

import SoundBoardSpeedDial from '../components/SoundBoardSpeedDial';

import { categoryCreate, soundBoard } from '../actions';

const mapStateToProps = undefined;

const mapDispatchToProps = {
  onCategoryCreate: categoryCreate.formShow,
  onBoardCreate: soundBoard.create,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundBoardSpeedDial);
