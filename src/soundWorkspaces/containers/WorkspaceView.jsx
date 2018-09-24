import { connect } from 'react-redux';

import WorkspaceView from '../components/WorkspaceView';

import { getActiveBoardUuid, getWorkspaceView } from '../selectors';
import { workspaceSound } from '../actions';

const mapStateToProps = state => ({
  board: getActiveBoardUuid(state),
  view: getWorkspaceView(state),
});

const mapDispatchToProps = {
  onAddSoundToBoard: workspaceSound.addToBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceView);
