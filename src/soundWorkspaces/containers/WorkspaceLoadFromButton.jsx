import OpenInBrowser from '@material-ui/icons/OpenInBrowser';

import { connect } from 'react-redux';

import LabelButton from '../../components/LabelButton';

import { workspaceLoad } from '../actions';

const mapStateToProps = () => ({
  children: 'Open Configuration',
  icon: OpenInBrowser,
});

const mapDispatchToProps = {
  onClick: workspaceLoad.dialogOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelButton);
