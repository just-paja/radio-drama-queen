import { connect } from 'react-redux';

import NoCategoriesMessage from '../components/NoCategoriesMessage';

import { categoryCreate } from '../actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onAdd: categoryCreate.formShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoCategoriesMessage);
