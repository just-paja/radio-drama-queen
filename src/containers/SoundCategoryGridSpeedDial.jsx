import { connect } from 'react-redux';

import SoundCategoryGridSpeedDial from '../components/SoundCategoryGridSpeedDial';

import { categoryCreate } from '../actions';

const mapStateToProps = undefined;

const mapDispatchToProps = {
  onCategoryCreate: categoryCreate.formShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundCategoryGridSpeedDial);
