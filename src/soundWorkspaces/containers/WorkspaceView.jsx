import { connect } from 'react-redux';

import WorkspaceView from '../components/WorkspaceView';

import { getWorkspaceView } from '../selectors';

const mapStateToProps = state => ({
  view: getWorkspaceView(state),
});

export default connect(mapStateToProps)(WorkspaceView);
