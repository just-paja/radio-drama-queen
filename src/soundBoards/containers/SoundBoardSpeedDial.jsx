import { connect } from 'react-redux';

import SoundBoardSpeedDial from '../components/SoundBoardSpeedDial';

import { categoryCreate } from '../actions';

const mapStateToProps = undefined;

const mapDispatchToProps = {
  onCategoryCreate: categoryCreate.formShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundBoardSpeedDial);
