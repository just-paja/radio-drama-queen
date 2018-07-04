import { connect } from 'react-redux';

import AppMenu from '../components/AppMenu';

import {
  getCategoryListUuids,
  isCategoryCreateFormVisible,
} from '../selectors';

const mapStateToProps = state => ({
  isEmpty: getCategoryListUuids(state).length === 0,
  showCreateForm: isCategoryCreateFormVisible(state),
});

export default connect(mapStateToProps)(AppMenu);
