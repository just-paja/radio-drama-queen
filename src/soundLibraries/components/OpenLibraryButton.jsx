import CloudDownload from '@material-ui/icons/CloudDownload'
import LabelButton from '../../components/LabelButton'

import { connect } from 'react-redux'
import { OpenLibraryDialog } from '../components'

const mapStateToProps = () => ({
  children: 'Add library',
  icon: CloudDownload
})

const mapDispatchToProps = {
  onClick: OpenLibraryDialog.open
}

export const OpenLibraryButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelButton)
