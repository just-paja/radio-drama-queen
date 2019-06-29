import LabelButton from '../../components/LabelButton'
import OpenInBrowser from '@material-ui/icons/OpenInBrowser'

import { connect } from 'react-redux'
import { WorkspaceLoadDialog } from './WorkspaceLoadDialog'

const mapStateToProps = () => ({
  children: 'Open Configuration',
  icon: OpenInBrowser
})

const mapDispatchToProps = {
  onClick: WorkspaceLoadDialog.open
}

export const WorkspaceLoadFromButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelButton)

WorkspaceLoadFromButton.displayName = 'WorkspaceLoadFromButton'
