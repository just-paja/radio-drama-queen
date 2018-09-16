import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import SoundName from './SoundName';
import SoundToggleButton from './SoundToggleButton';

import { Sound } from '../proptypes';

const styles = {
  inline: {
    display: 'flex',
    alignItems: 'center',
  },
};

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
    const { classes, search, sound } = this.props;
    return sound ? (
      <div className={classes.inline}>
        <SoundToggleButton
          loading={sound.loading}
          onClick={this.handleToggle}
          playing={sound.playing}
          error={sound.error}
        />
        <SoundName
          name={sound.name}
          uuid={sound.uuid}
          highlight={search}
        />
      </div>
    ) : null;
  }
}

SoundCategoryItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onToggle: PropTypes.func.isRequired,
  search: PropTypes.string,
  sound: Sound.isRequired,
};

SoundCategoryItem.defaultProps = {
  search: '',
};

export default withStyles(styles)(SoundCategoryItem);
