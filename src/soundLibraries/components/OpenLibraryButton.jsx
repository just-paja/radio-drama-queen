import CloudDownload from '@material-ui/icons/CloudDownload'
import LabelButton from '../../components/LabelButton'

import { connect } from 'react-redux'
import { noArgs } from '../../components'
import { OpenLibraryDialog } from './OpenLibraryDialog'

const mapStateToProps = () => ({
  children: 'Add library',
  icon: CloudDownload
})

const mapDispatchToProps = {
  onClick: noArgs(OpenLibraryDialog.open)
}

export const OpenLibraryButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelButton)
