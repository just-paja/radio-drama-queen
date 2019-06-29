import { connect } from 'react-redux'
import { workspaceRoutines } from '../actions'

import DeleteButton from '../../components/DeleteButton'

const mapStateToProps = () => ({
  children: 'Wipe Library'
})

const mapDispatchToProps = {
  onClick: workspaceRoutines.wipe
}

export const WorkspaceWipeButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteButton)
