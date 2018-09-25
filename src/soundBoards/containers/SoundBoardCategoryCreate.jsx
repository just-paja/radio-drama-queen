import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import SoundBoardCategoryCreateForm from '../components/SoundBoardCategoryCreateForm';

import { categoryCreate } from '../actions';
import { FORM_CATEGORY_CREATE } from '../constants';

const mapStateToProps = undefined;

const mapDispatchToProps = {
  onCancel: categoryCreate.formHide,
  onSubmit: (values, dispatch, { board }) => categoryCreate.submit(values, { board }),
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: FORM_CATEGORY_CREATE,
})(SoundBoardCategoryCreateForm));
