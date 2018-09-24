import { connect } from 'react-redux';

import WorkspaceView from '../components/WorkspaceView';

import { getWorkspaceView } from '../selectors';
import { workspaceSound } from '../actions';

const mapStateToProps = state => ({
  view: getWorkspaceView(state),
});

const mapDispatchToProps = {
  onAddSoundToBoard: workspaceSound.addToBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceView);
