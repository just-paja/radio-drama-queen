import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SoundCategoryRenameForm from '../components/SoundCategoryRenameForm';

import { categoryRename } from '../actions';
import { getCategoryName } from '../selectors';
import { FORM_CATEGORY_RENAME } from '../constants';

const mapStateToProps = (state, { categoryUuid }) => ({
  initialValues: {
    name: getCategoryName(state, categoryUuid),
  },
});

const mapDispatchToProps = (dispatch, { categoryUuid }) => bindActionCreators({
  onCancel: categoryRename.close,
  onSubmit: values => categoryRename.submit(categoryUuid, values.name),
}, dispatch);

const container = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: FORM_CATEGORY_RENAME,
})(SoundCategoryRenameForm));

container.displayName = 'Connect(ReduxForm(SoundBoardCategoryCreate))';

export default container;
