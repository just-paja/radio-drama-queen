import { connect } from 'react-redux';

import SaveButton from '../components/SaveButton';

import { library } from '../actions';

const mapStateToProps = () => ({
  children: 'Save',
});

const mapDispatchToProps = {
  onClick: library.save,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
