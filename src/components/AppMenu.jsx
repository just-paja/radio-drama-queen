import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';

import AddCategoryButton from '../containers/AddCategoryButton';

const AppMenu = ({
  isEmpty,
  showCreateForm,
}) => (
  <AppBar position="static">
    <Toolbar>
      {(showCreateForm || isEmpty) ? null : <AddCategoryButton />}
    </Toolbar>
  </AppBar>
);

AppMenu.propTypes = {
  isEmpty: PropTypes.bool,
  showCreateForm: PropTypes.bool,
};

AppMenu.defaultProps = {
  isEmpty: false,
  showCreateForm: false,
};

export default AppMenu;
