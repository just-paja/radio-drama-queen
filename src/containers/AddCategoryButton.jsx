import { connect } from 'react-redux';

import AddCategoryButton from '../components/AddButton';

import { categoryCreate } from '../actions';

const mapStateToProps = () => ({
  children: 'Add category',
});

const mapDispatchToProps = {
  onClick: categoryCreate.formShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryButton);
