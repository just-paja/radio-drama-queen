import { connect } from 'react-redux';

import SoundCategoryRemoveButton from '../components/SoundCategoryRemoveButton';

import { categoryList } from '../actions';

const mapStateToProps = undefined;

const mapDispatchToProps = {
  onClick: categoryList.removeStop,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundCategoryRemoveButton);
