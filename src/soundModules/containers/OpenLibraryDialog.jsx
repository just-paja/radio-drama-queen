import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import OpenLibraryDialog from '../components/OpenLibraryDialog'

import { libraryLoad } from '../actions'
import { FORM_LIBRARY_OPEN } from '../constants'
import { isOpenLibraryDialogOpen } from '../selectors'

const mapStateToProps = state => ({
  open: isOpenLibraryDialogOpen(state)
})

const mapDispatchToProps = {
  onClose: libraryLoad.dialogHide,
  onSubmit: libraryLoad.submit
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: FORM_LIBRARY_OPEN
})(OpenLibraryDialog))
