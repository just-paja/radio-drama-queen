import { connect } from 'react-redux';

import OpenButton from '../../components/OpenButton';

import { libraryLoad } from '../actions';

const mapStateToProps = () => ({
  children: 'Open Library',
});

const mapDispatchToProps = {
  onClick: libraryLoad.dialogShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenButton);
