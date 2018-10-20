import { connect } from 'react-redux';

import SoundCategoryMenu from '../components/SoundCategoryMenu';

import { categoryList, categoryRename } from '../actions';

const mapStateToProps = undefined;

const mapDispatchToProps = {
  onRemove: categoryList.removeStop,
  onRename: categoryRename.open,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundCategoryMenu);
