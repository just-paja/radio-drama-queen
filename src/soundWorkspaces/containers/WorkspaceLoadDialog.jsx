import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import WorkspaceLoadDialog from '../components/WorkspaceLoadDialog'

import { workspaceLoad } from '../actions'
import { FORM_WORKSPACE_LOAD_FROM } from '../constants'
import { getWorkspaceFilePath, isLoadFromDialogOpen } from '../selectors'

const mapStateToProps = state => ({
  open: isLoadFromDialogOpen(state),
  initialValues: {
    path: getWorkspaceFilePath(state)
  }
})

const mapDispatchToProps = {
  onClose: workspaceLoad.dialogHide,
  onSubmit: workspaceLoad.loadFrom
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: FORM_WORKSPACE_LOAD_FROM
})(WorkspaceLoadDialog))
