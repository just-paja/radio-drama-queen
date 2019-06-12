import { connect } from 'react-redux'

import WorkspaceSelection from '../components/WorkspaceSelection'

import { workspace } from '../actions'
import { getActiveBoardUuid, getWorkspaceView } from '../selectors'

const mapStateToProps = state => ({
  activeBoard: getActiveBoardUuid(state),
  view: getWorkspaceView(state)
})

const mapDispatchToProps = {
  onBoardSelect: workspace.selectBoard,
  onViewSelect: workspace.selectView
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceSelection)
