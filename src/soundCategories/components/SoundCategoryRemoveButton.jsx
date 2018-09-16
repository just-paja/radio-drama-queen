import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Delete from '@material-ui/icons/Delete';

import SoundCategoryIconButton from './SoundCategoryIconButton';

class SoundCategoryRemoveButton extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onClick, uuid } = this.props;
    onClick(uuid);
  }

  render() {
    const { uuid, onClick, ...props } = this.props;
    return (
      <SoundCategoryIconButton
        {...props}
        icon={Delete}
        onClick={this.handleClick}
      />
    );
  }
}

SoundCategoryRemoveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
};

export default SoundCategoryRemoveButton;
