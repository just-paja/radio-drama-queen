import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import CategoryEditForm from '../components/CategoryEditForm';

import { categoryCreate } from '../actions';
import { FORM_CATEGORY_CREATE } from '../constants';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onSubmit: categoryCreate.submit,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: FORM_CATEGORY_CREATE,
})(CategoryEditForm));
