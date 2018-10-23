import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Classes } from '../../proptypes';
import { SoundTag as SoundTagPropType } from '../proptypes';

const styles = theme => ({
  button: {
    background: 'none',
    border: 'none',
    color: theme.palette.text.hint,
    margin: 0,
    padding: 0,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
});

class SoundTag extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onClick, tag } = this.props;
    if (onClick) {
      onClick(tag.name);
    }
  }

  render() {
    const { classes, tag } = this.props;
    if (!tag) {
      return null;
    }
    return (
      <button
        className={classes.button}
        onClick={this.handleClick}
        type="button"
      >
        #
        {(tag.title && tag.title.cs) || tag.name}
      </button>
    );
  }
}

SoundTag.propTypes = {
  classes: Classes.isRequired,
  onClick: PropTypes.func,
  tag: SoundTagPropType,
};

SoundTag.defaultProps = {
  onClick: null,
  tag: null,
};

export default withStyles(styles)(SoundTag);
