import { connect } from 'react-redux';

import WorkspaceSelection from '../components/WorkspaceSelection';

import { workspace } from '../actions';
import { getActiveBoard, getWorkspaceView } from '../selectors';

const mapStateToProps = state => ({
  board: getActiveBoard(state),
  view: getWorkspaceView(state),
});

const mapDispatchToProps = {
  onBoardSelect: workspace.selectBoard,
  onViewSelect: workspace.selectView,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceSelection);
