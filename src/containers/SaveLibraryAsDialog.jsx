import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import SaveAsDialog from '../components/SaveAsDialog';

import { library } from '../actions';
import { FORM_LIBRARY_SAVE_AS } from '../constants';
import { getLibraryFsPath, isSaveAsDialogOpen } from '../selectors';

const mapStateToProps = state => ({
  initialValues: {
    fsPath: getLibraryFsPath(state),
  },
  open: isSaveAsDialogOpen(state),
});

const mapDispatchToProps = {
  onClose: library.saveAsCancel,
  onSubmit: library.saveAsSubmit,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: FORM_LIBRARY_SAVE_AS,
})(SaveAsDialog));
