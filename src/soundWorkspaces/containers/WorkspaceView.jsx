import { connect } from 'react-redux';

import WorkspaceView from '../components/WorkspaceView';

import {
  getActiveBoardUuid,
  getWorkspaceView,
} from '../selectors';

const mapStateToProps = state => ({
  board: getActiveBoardUuid(state),
  view: getWorkspaceView(state),
});

export default connect(mapStateToProps)(WorkspaceView);
