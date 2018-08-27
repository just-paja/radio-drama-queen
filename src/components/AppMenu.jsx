import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';

import AddCategoryButton from '../containers/AddCategoryButton';
import SaveLibraryAsButton from '../containers/SaveLibraryAsButton';
import SaveLibraryButton from '../containers/SaveLibraryButton';
import OpenLibraryButton from '../containers/OpenLibraryButton';

const AppMenu = ({
  isEmpty,
  showCreateForm,
}) => {
  const buttons = [];

  if (!showCreateForm && !isEmpty) {
    buttons.push(<AddCategoryButton key="add-button" />);
  }

  if (!isEmpty) {
    buttons.push(<OpenLibraryButton key="open" />);
    buttons.push(<SaveLibraryButton key="save" />);
    buttons.push(<SaveLibraryAsButton key="save-as" />);
  }

  return (
    <AppBar position="static">
      <Toolbar>
        {buttons}
      </Toolbar>
    </AppBar>
  );
};

AppMenu.propTypes = {
  isEmpty: PropTypes.bool,
  showCreateForm: PropTypes.bool,
};

AppMenu.defaultProps = {
  isEmpty: false,
  showCreateForm: false,
};

export default AppMenu;
