import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { SoundName, SoundStatusIcon } from '../../sounds/components';
import { Sound } from '../../sounds/proptypes';

const styles = theme => ({
  button: {
    alignItems: 'center',
    background: 'none',
    border: 'none',
    display: 'flex',
    margin: 0,
    padding: theme.spacing(1),
    userSelect: 'none',
    width: '100%',
    '&:hover': {
      background: theme.palette.action.hover,
    },
  },
  icon: {
    height: theme.typography.fontSize * 3/2,
    marginLeft: theme.spacing(1/2),
    marginRight: theme.spacing(1.5),
    width: theme.typography.fontSize * 3/2,
  }
});

class SoundCategoryItem extends Component {
  constructor() {
    super();
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const { onToggle, sound } = this.props;
    onToggle(sound.uuid);
  }

  render() {
    const {
      classes,
      connectDragSource,
      search,
      sound,
    } = this.props;
    return sound && connectDragSource ? connectDragSource(
      <button
        className={classes.button}
        disabled={Boolean(sound.error)}
        onClick={this.handleToggle}
      >
        <SoundStatusIcon
          className={classes.icon}
          error={sound.error}
          loading={sound.loading}
          playing={sound.playing}
          size={21}
          valid={sound.valid}
        />
        <SoundName
          name={sound.name}
          uuid={sound.uuid}
          highlight={search}
        />
    </button>
    ) : null;
  }
}

SoundCategoryItem.propTypes = {
  connectDragSource: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onToggle: PropTypes.func.isRequired,
  search: PropTypes.string,
  sound: Sound.isRequired,
};

SoundCategoryItem.defaultProps = {
  connectDragSource: null,
  search: '',
};

export default withStyles(styles)(SoundCategoryItem);
