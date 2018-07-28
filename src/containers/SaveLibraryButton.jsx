import { connect } from 'react-redux';

import SaveButton from '../components/SaveButton';

import { library } from '../actions';
import { getLibraryFsPath } from '../selectors';

const mapStateToProps = state => ({
  children: 'Save',
  disabled: !getLibraryFsPath(state),
});

const mapDispatchToProps = {
  onClick: library.save,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
