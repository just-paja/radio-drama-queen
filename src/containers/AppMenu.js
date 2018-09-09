import { connect } from 'react-redux';

import AppMenu from '../components/AppMenu';

import { getCategoryListUuids } from '../selectors';

const mapStateToProps = state => ({
  isEmpty: getCategoryListUuids(state).length === 0,
});

export default connect(mapStateToProps)(AppMenu);
