import { connect } from 'react-redux';

import WorkspaceView from '../components/WorkspaceView';

import { getActiveBoardUuid, getWorkspaceView } from '../selectors';
import { workspaceSound, workspaceTag } from '../actions';
import { soundBoard } from '../../soundBoards/actions';
import { libraryLoad } from '../../soundModules/actions';

const mapStateToProps = state => ({
  board: getActiveBoardUuid(state),
  view: getWorkspaceView(state),
});

const mapDispatchToProps = {
  onAddSoundToBoard: workspaceSound.addToBoard,
  onAddTagToBoard: workspaceTag.addToBoard,
  onBoardCreate: soundBoard.create,
  onLibraryOpen: libraryLoad.dialogShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceView);
