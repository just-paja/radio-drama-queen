import { connect } from 'react-redux';

import OpenButton from '../../components/OpenButton';

import { library } from '../actions';

const mapStateToProps = () => ({
  children: 'Open Library',
});

const mapDispatchToProps = {
  onClick: library.openDialogShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenButton);
