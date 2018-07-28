import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';

import AddCategoryButton from '../containers/AddCategoryButton';
import SaveLibraryAsButton from '../containers/SaveLibraryAsButton';
import SaveLibraryButton from '../containers/SaveLibraryButton';

const AppMenu = ({
  isEmpty,
  showCreateForm,
}) => (
  <AppBar position="static">
    <Toolbar>
      {(showCreateForm || isEmpty) ? null : <AddCategoryButton />}
      <SaveLibraryButton />
      <SaveLibraryAsButton />
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
