import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import WorkspaceSaveDialog from '../components/WorkspaceSaveDialog';

import { workspaceSave } from '../actions';
import { FORM_WORKSPACE_SAVE_AS } from '../constants';
import { getWorkspaceFilePath, isSaveAsDialogOpen } from '../selectors';

const mapStateToProps = state => ({
  open: isSaveAsDialogOpen(state),
  initialValues: {
    path: getWorkspaceFilePath(state),
  },
});

const mapDispatchToProps = {
  onClose: workspaceSave.dialogHide,
  onSubmit: workspaceSave.saveAs,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: FORM_WORKSPACE_SAVE_AS,
})(WorkspaceSaveDialog));
