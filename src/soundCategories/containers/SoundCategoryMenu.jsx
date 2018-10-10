import { connect } from 'react-redux';

import SoundCategoryMenu from '../components/SoundCategoryMenu';

import { categoryList } from '../actions';

const mapStateToProps = undefined;

const mapDispatchToProps = {
  onRemove: categoryList.removeStop,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundCategoryMenu);
