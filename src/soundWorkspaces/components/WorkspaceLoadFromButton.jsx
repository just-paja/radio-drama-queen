import LabelButton from '../../components/LabelButton'
import OpenInBrowser from '@material-ui/icons/OpenInBrowser'

import { connect } from 'react-redux'
import { workspaceLoad } from '../actions'

const mapStateToProps = () => ({
  children: 'Open Configuration',
  icon: OpenInBrowser
})

const mapDispatchToProps = {
  onClick: workspaceLoad.dialogOpen
}

export const WorkspaceLoadFromButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelButton)
