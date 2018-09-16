import { connect } from 'react-redux';

import SaveButton from '../components/SaveButton';

import { library } from '../actions';

const mapStateToProps = () => ({
  children: 'Save As',
});

const mapDispatchToProps = {
  onClick: library.saveAs,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
