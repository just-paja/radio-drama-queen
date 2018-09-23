import { connect } from 'react-redux';

import WorkspaceSelection from '../components/WorkspaceSelection';

import { workspace } from '../actions';
import { getWorkspaceView } from '../selectors';

const mapStateToProps = state => ({
  view: getWorkspaceView(state),
});

const mapDispatchToProps = {
  onViewSelect: workspace.selectView,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceSelection);
