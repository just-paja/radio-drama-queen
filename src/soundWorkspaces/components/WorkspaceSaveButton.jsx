import LabelButton from '../../components/LabelButton'
import Save from '@material-ui/icons/Save'

import { connect } from 'react-redux'
import { getWorkspaceFilePath, isWorkspaceEmpty } from '../selectors'
import { workspaceSave } from '../actions'

const mapStateToProps = (state) => ({
  children: 'Save',
  disabled: isWorkspaceEmpty(state) || !getWorkspaceFilePath(state),
  icon: Save
})

const mapDispatchToProps = {
  onClick: workspaceSave.trigger
}

export const WorkspaceSaveButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelButton)
