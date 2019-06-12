import CloudDownload from '@material-ui/icons/CloudDownload'

import { connect } from 'react-redux'

import LabelButton from '../../components/LabelButton'

import { libraryLoad } from '../actions'

const mapStateToProps = () => ({
  children: 'Download Library',
  icon: CloudDownload
})

const mapDispatchToProps = {
  onClick: libraryLoad.dialogShow
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelButton)
