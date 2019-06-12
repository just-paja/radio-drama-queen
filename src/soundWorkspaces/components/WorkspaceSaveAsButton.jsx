import LabelButton from '../../components/LabelButton'
import SaveAlt from '@material-ui/icons/SaveAlt'

import { connect } from 'react-redux'
import { isWorkspaceEmpty } from '../selectors'
import { workspaceSave } from '../actions'

const mapStateToProps = (state) => ({
  children: 'Save As',
  disabled: isWorkspaceEmpty(state),
  icon: SaveAlt
})

const mapDispatchToProps = {
  onClick: workspaceSave.dialogOpen
}

export const WorkspaceSaveAsButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelButton)
